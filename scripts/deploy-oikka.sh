#!/usr/bin/env bash
# Sync OIKKA Chile to the VPS and rebuild oikka-web.
# Local: ~/.ssh/oracle_santiago  |  CI: ssh-agent with DEPLOY_SSH_KEY
set -euo pipefail

HOST="${DEPLOY_HOST:-192.141.169.43}"
USER="${DEPLOY_USER:-root}"
REMOTE="${USER}@${HOST}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KNOWN_HOSTS="${DEPLOY_KNOWN_HOSTS_FILE:-$ROOT/deploy/known_hosts}"

ssh_opts=(-o StrictHostKeyChecking=yes)
if [[ -f "$KNOWN_HOSTS" ]]; then
  ssh_opts+=(-o UserKnownHostsFile="$KNOWN_HOSTS")
fi
if [[ -z "${SSH_AUTH_SOCK:-}" && -f "${HOME}/.ssh/oracle_santiago" ]]; then
  ssh_opts+=(-i "${HOME}/.ssh/oracle_santiago" -o IdentitiesOnly=yes)
fi

ssh_cmd() { ssh "${ssh_opts[@]}" "$@"; }
rsync_ssh() { printf 'ssh'; for opt in "${ssh_opts[@]}"; do printf ' %q' "$opt"; done; }

excludes=(
  --exclude node_modules
  --exclude dist
  --exclude .git
  --exclude coverage
  --exclude '*.log'
  --exclude .env
  --exclude data
  --exclude uploads
  --exclude docs
)

echo "→ ${REMOTE}: oikka-chile"
rsync -az --delete "${excludes[@]}" -e "$(rsync_ssh)" \
  "$ROOT/" "$REMOTE:/opt/dozai/oikka-chile/"

echo "→ rebuild oikka-web"
ssh_cmd "$REMOTE" 'set -euo pipefail
cd /opt/dozai
docker compose build oikka-web
docker compose up -d oikka-web
sleep 6
docker compose ps oikka-web
'

echo "→ health"
curl -fsS -m 20 -H "Host: oikkaisshinryuchile.com" "http://${HOST}/api/health"
echo
echo "OK"

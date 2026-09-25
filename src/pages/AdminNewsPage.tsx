import { type FormEvent, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAdminAuth } from '../adminAuth/useAdminAuth'
import { AdminAccountMenu } from '../components/AdminAccountMenu'
import {
  api,
  imageSrc,
  type EventItem,
  type GalleryItem,
  type NewsItem,
  type VideoItem,
  type VideosDoc,
} from '../lib/api'
import { formatEventWhen, isUpcomingEvent } from '../lib/eventFormat'
import styles from './Admin.module.css'

type Tab = 'noticias' | 'eventos' | 'galeria' | 'videos'

const TAB_TITLES: Record<Tab, string> = {
  noticias: 'Noticias',
  eventos: 'Eventos',
  galeria: 'Galería',
  videos: 'Videos',
}

function isTab(value: string | undefined): value is Tab {
  return value === 'noticias' || value === 'eventos' || value === 'galeria' || value === 'videos'
}

export function AdminNewsPage() {
  const { section } = useParams<{ section?: string }>()
  const navigate = useNavigate()
  const { user, loading } = useAdminAuth()
  const tab: Tab = isTab(section) ? section : 'noticias'
  const setTab = (next: Tab) => {
    navigate(`/admin/${next}`)
  }
  const [items, setItems] = useState<NewsItem[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [eventTitle, setEventTitle] = useState('')
  const [eventBody, setEventBody] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventPlace, setEventPlace] = useState('')
  const [eventImage, setEventImage] = useState<File | null>(null)
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [videos, setVideos] = useState<VideosDoc>({ title: '', intro: '', items: [] })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [galleryAlt, setGalleryAlt] = useState('')
  const [galleryImage, setGalleryImage] = useState<File | null>(null)
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null)
  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionIntro, setSectionIntro] = useState('')
  const [videoYoutube, setVideoYoutube] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoNote, setVideoNote] = useState('')
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [editingVideoFileUrl, setEditingVideoFileUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function loadAll() {
    const [newsItems, eventItems, galleryItems, videoDoc] = await Promise.all([
      api.listNews(),
      api.listEvents(),
      api.listGallery(),
      api.listVideos(),
    ])
    setItems(newsItems)
    setEvents(eventItems)
    setGallery(galleryItems)
    setVideos(videoDoc)
    setSectionTitle(videoDoc.title)
    setSectionIntro(videoDoc.intro)
  }

  useEffect(() => {
    if (!user) return
    void loadAll().catch((err: Error) => setError(err.message))
  }, [user])

  if (loading) {
    return <div className={styles.page}><p className={styles.help}>Cargando…</p></div>
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  if (section && !isTab(section)) {
    return <Navigate to="/admin/noticias" replace />
  }

  function flash(ok: string | null, fail?: unknown) {
    if (ok) {
      setMessage(ok)
      setError(null)
      return
    }
    setMessage(null)
    setError(fail instanceof Error ? fail.message : 'No se pudo guardar')
  }

  function resetNewsForm() {
    setEditingId(null)
    setTitle('')
    setBody('')
    setImage(null)
  }

  function resetEventForm() {
    setEditingEventId(null)
    setEventTitle('')
    setEventBody('')
    setEventDate('')
    setEventTime('')
    setEventPlace('')
    setEventImage(null)
  }

  function onEditEvent(item: EventItem) {
    setTab('eventos')
    setEditingEventId(item.id)
    setEventTitle(item.title)
    setEventBody(item.body)
    setEventDate(item.date)
    setEventTime(item.time ?? '')
    setEventPlace(item.place ?? '')
    setEventImage(null)
    setError(null)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function onSaveEvent(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const formData = new FormData()
      formData.append('title', eventTitle)
      formData.append('body', eventBody)
      formData.append('date', eventDate)
      formData.append('time', eventTime)
      formData.append('place', eventPlace)
      if (eventImage) formData.append('image', eventImage)
      if (editingEventId) {
        await api.updateEvent(editingEventId, formData)
        flash('Evento actualizado')
      } else {
        await api.createEvent(formData)
        flash('Evento publicado')
      }
      resetEventForm()
      await loadAll()
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  async function onDeleteEvent(id: string) {
    if (!window.confirm('¿Eliminar este evento?')) return
    setBusy(true)
    try {
      await api.deleteEvent(id)
      if (editingEventId === id) resetEventForm()
      await loadAll()
      flash('Evento eliminado')
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  function resetGalleryForm() {
    setEditingGalleryId(null)
    setGalleryAlt('')
    setGalleryImage(null)
  }

  function resetVideoForm() {
    setEditingVideoId(null)
    setVideoYoutube('')
    setVideoTitle('')
    setVideoNote('')
    setVideoFile(null)
    setEditingVideoFileUrl(null)
  }

  function onEdit(item: NewsItem) {
    setTab('noticias')
    setEditingId(item.id)
    setTitle(item.title)
    setBody(item.body)
    setImage(null)
    setError(null)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function onSave(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', body)
      if (image) formData.append('image', image)
      if (editingId) {
        await api.updateNews(editingId, formData)
        flash('Noticia actualizada')
      } else {
        await api.createNews(formData)
        flash('Noticia publicada')
      }
      resetNewsForm()
      await loadAll()
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm('¿Eliminar esta noticia?')) return
    setBusy(true)
    try {
      await api.deleteNews(id)
      if (editingId === id) resetNewsForm()
      await loadAll()
      flash('Noticia eliminada')
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  function onEditGallery(item: GalleryItem) {
    setTab('galeria')
    setEditingGalleryId(item.id)
    setGalleryAlt(item.alt)
    setGalleryImage(null)
    setError(null)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function onSaveGallery(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const formData = new FormData()
      formData.append('alt', galleryAlt)
      if (galleryImage) formData.append('image', galleryImage)
      if (editingGalleryId) {
        await api.updateGallery(editingGalleryId, formData)
        flash('Foto actualizada')
      } else {
        if (!galleryImage) {
          flash(null, new Error('Elige una imagen para la galería'))
          setBusy(false)
          return
        }
        await api.createGallery(formData)
        flash('Foto agregada a la galería')
      }
      resetGalleryForm()
      await loadAll()
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  async function onDeleteGallery(id: string) {
    if (!window.confirm('¿Quitar esta foto de la galería?')) return
    setBusy(true)
    try {
      await api.deleteGallery(id)
      if (editingGalleryId === id) resetGalleryForm()
      await loadAll()
      flash('Foto eliminada')
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  async function onMoveGallery(id: string, direction: 'up' | 'down') {
    setBusy(true)
    try {
      setGallery(await api.moveGallery(id, direction))
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  async function onSaveSection(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const next = await api.updateVideosSection(sectionTitle, sectionIntro)
      setVideos(next)
      flash('Título y texto de la sección de videos guardados')
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  function onEditVideo(item: VideoItem) {
    setTab('videos')
    setEditingVideoId(item.id)
    setVideoYoutube(item.youtubeId ?? '')
    setVideoTitle(item.title)
    setVideoNote(item.note)
    setVideoFile(null)
    setEditingVideoFileUrl(item.fileUrl)
    setError(null)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function onSaveVideo(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      if (!videoYoutube.trim() && !videoFile && !editingVideoFileUrl) {
        flash(null, new Error('Sube un archivo o pega un enlace de YouTube'))
        setBusy(false)
        return
      }
      const formData = new FormData()
      formData.append('title', videoTitle)
      formData.append('note', videoNote)
      if (videoYoutube.trim()) formData.append('youtube', videoYoutube.trim())
      if (videoFile) formData.append('video', videoFile)
      if (editingVideoId) {
        await api.updateVideo(editingVideoId, formData)
        flash('Video actualizado')
      } else {
        await api.createVideo(formData)
        flash('Video publicado')
      }
      resetVideoForm()
      await loadAll()
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  async function onDeleteVideo(id: string) {
    if (!window.confirm('¿Eliminar este video?')) return
    setBusy(true)
    try {
      await api.deleteVideo(id)
      if (editingVideoId === id) resetVideoForm()
      await loadAll()
      flash('Video eliminado')
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  async function onMoveVideo(id: string, direction: 'up' | 'down') {
    setBusy(true)
    try {
      const next = await api.moveVideo(id, direction)
      setVideos(next)
    } catch (err) {
      flash(null, err)
    } finally {
      setBusy(false)
    }
  }

  const pageTitle = TAB_TITLES[tab]

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Panel</p>
            <h1 className={styles.title}>{pageTitle}</h1>
            <p className={styles.help}>
              {user.name ? `${user.name} · ` : ''}
              {user.email}
            </p>
          </div>
          <div className={styles.topActions}>
            <AdminAccountMenu />
            <Link className={styles.back} to="/">
              Ver sitio
            </Link>
          </div>
        </header>

        {error ? <p className={styles.error}>{error}</p> : null}
        {message ? <p className={styles.success}>{message}</p> : null}

        {tab === 'noticias' ? (
          <>
            <form className={styles.panelWide} onSubmit={onSave}>
              <h2 className={styles.sectionTitle}>
                {editingId ? 'Editar noticia' : 'Publicar noticia'}
              </h2>
              <label className={styles.label}>
                Título
                <input
                  className={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label className={styles.label}>
                Contenido
                <textarea
                  className={styles.textarea}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                  required
                />
              </label>
              <label className={styles.label}>
                Imagen (opcional)
                <input
                  className={styles.input}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                />
              </label>
              <div className={styles.formActions}>
                <button className={styles.button} type="submit" disabled={busy}>
                  {busy ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Publicar'}
                </button>
                {editingId ? (
                  <button
                    className={styles.secondaryButton}
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      resetNewsForm()
                      setMessage(null)
                    }}
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </form>

            <section className={styles.panelWide}>
              <h2 className={styles.sectionTitle}>Publicadas</h2>
              {items.length === 0 ? (
                <p className={styles.help}>Aún no hay noticias.</p>
              ) : (
                <ul className={styles.newsList}>
                  {items.map((item) => {
                    const src = imageSrc(item.imageUrl)
                    return (
                      <li key={item.id} className={styles.newsRow}>
                        {src ? <img src={src} alt="" className={styles.thumb} /> : null}
                        <div className={styles.newsCopy}>
                          <strong>{item.title}</strong>
                          <p>{item.body}</p>
                        </div>
                        <div className={styles.rowActions}>
                          <button
                            className={styles.secondaryButton}
                            type="button"
                            disabled={busy}
                            onClick={() => onEdit(item)}
                          >
                            Editar
                          </button>
                          <button
                            className={styles.dangerButton}
                            type="button"
                            disabled={busy}
                            onClick={() => void onDelete(item.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </>
        ) : null}


        {tab === 'eventos' ? (
          <>
            <form className={styles.panelWide} onSubmit={onSaveEvent}>
              <h2 className={styles.sectionTitle}>
                {editingEventId ? 'Editar evento' : 'Publicar evento'}
              </h2>
              <p className={styles.help}>
                Los eventos con fecha de hoy o posterior aparecen en “Próximos eventos” del sitio.
              </p>
              <label className={styles.label}>
                Título
                <input
                  className={styles.input}
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                />
              </label>
              <label className={styles.label}>
                Fecha
                <input
                  className={styles.input}
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </label>
              <label className={styles.label}>
                Hora (opcional)
                <input
                  className={styles.input}
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </label>
              <label className={styles.label}>
                Lugar (opcional)
                <input
                  className={styles.input}
                  value={eventPlace}
                  onChange={(e) => setEventPlace(e.target.value)}
                  placeholder="Honbu Dojo Temuco"
                />
              </label>
              <label className={styles.label}>
                Descripción
                <textarea
                  className={styles.textarea}
                  value={eventBody}
                  onChange={(e) => setEventBody(e.target.value)}
                  rows={5}
                  required
                />
              </label>
              <label className={styles.label}>
                Imagen (opcional)
                <input
                  className={styles.input}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEventImage(e.target.files?.[0] ?? null)}
                />
              </label>
              <div className={styles.formActions}>
                <button className={styles.button} type="submit" disabled={busy}>
                  {busy ? 'Guardando…' : editingEventId ? 'Guardar cambios' : 'Publicar evento'}
                </button>
                {editingEventId ? (
                  <button
                    className={styles.secondaryButton}
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      resetEventForm()
                      setMessage(null)
                    }}
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </form>

            <section className={styles.panelWide}>
              <h2 className={styles.sectionTitle}>Eventos</h2>
              {events.length === 0 ? (
                <p className={styles.help}>Aún no hay eventos.</p>
              ) : (
                <ul className={styles.newsList}>
                  {events.map((item) => {
                    const src = imageSrc(item.imageUrl)
                    const upcoming = isUpcomingEvent(item)
                    return (
                      <li key={item.id} className={styles.newsRow}>
                        {src ? <img src={src} alt="" className={styles.thumb} /> : null}
                        <div className={styles.newsCopy}>
                          <strong>{item.title}</strong>
                          <p>
                            {upcoming ? 'Próximo · ' : 'Pasado · '}
                            {formatEventWhen(item)}
                            {item.place ? ` · ${item.place}` : ''}
                          </p>
                          <p>{item.body}</p>
                        </div>
                        <div className={styles.rowActions}>
                          <button
                            className={styles.secondaryButton}
                            type="button"
                            disabled={busy}
                            onClick={() => onEditEvent(item)}
                          >
                            Editar
                          </button>
                          <button
                            className={styles.dangerButton}
                            type="button"
                            disabled={busy}
                            onClick={() => void onDeleteEvent(item.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </>
        ) : null}

        {tab === 'galeria' ? (
          <>
            <form className={styles.panelWide} onSubmit={onSaveGallery}>
              <h2 className={styles.sectionTitle}>
                {editingGalleryId ? 'Editar foto' : 'Agregar foto'}
              </h2>
              <p className={styles.help}>
                Sube fotos del dojo. El texto describe la imagen y se muestra si no carga.
              </p>
              <label className={styles.label}>
                Descripción
                <input
                  className={styles.input}
                  value={galleryAlt}
                  onChange={(e) => setGalleryAlt(e.target.value)}
                  placeholder="Entrenamiento en el honbu dojo"
                  required
                />
              </label>
              <label className={styles.label}>
                {editingGalleryId ? 'Nueva imagen (opcional)' : 'Imagen'}
                <input
                  className={styles.input}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGalleryImage(e.target.files?.[0] ?? null)}
                  required={!editingGalleryId}
                />
              </label>
              <div className={styles.formActions}>
                <button className={styles.button} type="submit" disabled={busy}>
                  {busy ? 'Guardando…' : editingGalleryId ? 'Guardar cambios' : 'Agregar a la galería'}
                </button>
                {editingGalleryId ? (
                  <button
                    className={styles.secondaryButton}
                    type="button"
                    disabled={busy}
                    onClick={resetGalleryForm}
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </form>

            <section className={styles.panelWide}>
              <h2 className={styles.sectionTitle}>Fotos en el sitio</h2>
              {gallery.length === 0 ? (
                <p className={styles.help}>Aún no hay fotos. Agrega la primera para crear la galería.</p>
              ) : (
                <ul className={styles.newsList}>
                  {gallery.map((item, index) => {
                    const src = imageSrc(item.imageUrl)
                    return (
                      <li key={item.id} className={styles.newsRow}>
                        {src ? <img src={src} alt="" className={styles.thumb} /> : null}
                        <div className={styles.newsCopy}>
                          <strong>{item.alt}</strong>
                          <p>Orden {index + 1}</p>
                        </div>
                        <div className={styles.rowActions}>
                          <button
                            className={styles.secondaryButton}
                            type="button"
                            disabled={busy || index === 0}
                            onClick={() => void onMoveGallery(item.id, 'up')}
                          >
                            Subir
                          </button>
                          <button
                            className={styles.secondaryButton}
                            type="button"
                            disabled={busy || index === gallery.length - 1}
                            onClick={() => void onMoveGallery(item.id, 'down')}
                          >
                            Bajar
                          </button>
                          <button
                            className={styles.secondaryButton}
                            type="button"
                            disabled={busy}
                            onClick={() => onEditGallery(item)}
                          >
                            Editar
                          </button>
                          <button
                            className={styles.dangerButton}
                            type="button"
                            disabled={busy}
                            onClick={() => void onDeleteGallery(item.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </>
        ) : null}

        {tab === 'videos' ? (
          <>
            <form className={styles.panelWide} onSubmit={onSaveSection}>
              <h2 className={styles.sectionTitle}>Sección de videos</h2>
              <p className={styles.help}>
                Este título e introducción se ven en la página de inicio. En OIKKA suele ser “Maestro Angi Uezu”.
              </p>
              <label className={styles.label}>
                Título de la sección
                <input
                  className={styles.input}
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  required
                />
              </label>
              <label className={styles.label}>
                Texto introductorio
                <textarea
                  className={styles.textarea}
                  value={sectionIntro}
                  onChange={(e) => setSectionIntro(e.target.value)}
                  rows={3}
                />
              </label>
              <div className={styles.formActions}>
                <button className={styles.button} type="submit" disabled={busy}>
                  {busy ? 'Guardando…' : 'Guardar sección'}
                </button>
              </div>
            </form>

            <form className={styles.panelWide} onSubmit={onSaveVideo}>
              <h2 className={styles.sectionTitle}>
                {editingVideoId ? 'Editar video' : 'Agregar video'}
              </h2>
              <p className={styles.help}>
                Puedes pegar un enlace de YouTube o subir el archivo al servidor (MP4, WebM o MOV, hasta 100 MB).
              </p>
              <label className={styles.label}>
                Enlace o ID de YouTube (opcional)
                <input
                  className={styles.input}
                  value={videoYoutube}
                  onChange={(e) => setVideoYoutube(e.target.value)}
                  placeholder="https://youtu.be/… o GPwsCzTbQ74"
                />
              </label>
              <label className={styles.label}>
                {editingVideoFileUrl && !videoFile ? 'Reemplazar archivo (opcional)' : 'Archivo de video (opcional)'}
                <input
                  className={styles.input}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.m4v"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                />
              </label>
              {editingVideoFileUrl && !videoFile ? (
                <p className={styles.help}>Ya hay un archivo en el servidor. Si subes otro, reemplaza el actual.</p>
              ) : null}
              <label className={styles.label}>
                Título
                <input
                  className={styles.input}
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  required
                />
              </label>
              <label className={styles.label}>
                Nota (opcional)
                <input
                  className={styles.input}
                  value={videoNote}
                  onChange={(e) => setVideoNote(e.target.value)}
                />
              </label>
              <div className={styles.formActions}>
                <button className={styles.button} type="submit" disabled={busy}>
                  {busy ? 'Guardando…' : editingVideoId ? 'Guardar cambios' : 'Publicar video'}
                </button>
                {editingVideoId ? (
                  <button
                    className={styles.secondaryButton}
                    type="button"
                    disabled={busy}
                    onClick={resetVideoForm}
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </form>

            <section className={styles.panelWide}>
              <h2 className={styles.sectionTitle}>Videos en el sitio</h2>
              {videos.items.length === 0 ? (
                <p className={styles.help}>Aún no hay videos. Pega un enlace de YouTube o sube un archivo.</p>
              ) : (
                <ul className={styles.newsList}>
                  {videos.items.map((item, index) => (
                    <li key={item.id} className={styles.newsRow}>
                      {item.youtubeId ? (
                        <img
                          className={styles.ytThumb}
                          src={`https://i.ytimg.com/vi/${item.youtubeId}/mqdefault.jpg`}
                          alt=""
                        />
                      ) : item.fileUrl ? (
                        <video className={styles.ytThumb} src={imageSrc(item.fileUrl) ?? undefined} muted />
                      ) : null}
                      <div className={styles.newsCopy}>
                        <strong>{item.title}</strong>
                        <p>{item.note || (item.fileUrl ? 'Archivo en el servidor' : item.youtubeId)}</p>
                      </div>
                      <div className={styles.rowActions}>
                        <button
                          className={styles.secondaryButton}
                          type="button"
                          disabled={busy || index === 0}
                          onClick={() => void onMoveVideo(item.id, 'up')}
                        >
                          Subir
                        </button>
                        <button
                          className={styles.secondaryButton}
                          type="button"
                          disabled={busy || index === videos.items.length - 1}
                          onClick={() => void onMoveVideo(item.id, 'down')}
                        >
                          Bajar
                        </button>
                        <button
                          className={styles.secondaryButton}
                          type="button"
                          disabled={busy}
                          onClick={() => onEditVideo(item)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.dangerButton}
                          type="button"
                          disabled={busy}
                          onClick={() => void onDeleteVideo(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}

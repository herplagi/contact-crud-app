import { Database, MapPin, Plus, RefreshCw, Search, UsersRound } from 'lucide-react'

export type DirectoryView = 'all' | 'countries' | 'cities'

type AppSidebarProps = {
  activeView: DirectoryView
  cities: number
  countries: number
  onAddContact: () => void
  onChangeView: (view: DirectoryView) => void
  onRefresh: () => void
  onSearch: (query: string) => void
  query: string
  status: string
  total: number
  visible: number
}

export function AppSidebar({
  activeView,
  cities,
  countries,
  onAddContact,
  onChangeView,
  onRefresh,
  onSearch,
  query,
  status,
  total,
  visible,
}: AppSidebarProps) {
  return (
    <aside className="app-sidebar">
      <div className="brand-block">
        <div>
          <h1>Contact</h1>
        </div>
      </div>

      <label className="sidebar-search">
        <Search size={17} />
        <input value={query} onChange={(event) => onSearch(event.target.value)} placeholder="Search contact" />
      </label>

      <nav className="sidebar-section" aria-label="Contact views">
        <p className="sidebar-label">Views</p>
        <div className="view-list">
          <button
            className={`view-item ${activeView === 'all' ? 'active' : ''}`}
            type="button"
            onClick={() => onChangeView('all')}
          >
            <UsersRound size={17} />
            <span>All Contacts</span>
            <strong>{total}</strong>
          </button>
          <button
            className={`view-item ${activeView === 'countries' ? 'active' : ''}`}
            type="button"
            onClick={() => onChangeView('countries')}
          >
            <Database size={17} />
            <span>Countries</span>
            <strong>{countries}</strong>
          </button>
          <button
            className={`view-item ${activeView === 'cities' ? 'active' : ''}`}
            type="button"
            onClick={() => onChangeView('cities')}
          >
            <MapPin size={17} />
            <span>Cities</span>
            <strong>{cities}</strong>
          </button>
        </div>
      </nav>

      <div className="sidebar-section">
        <p className="sidebar-label">Actions</p>
        <button className="view-item" type="button" onClick={onRefresh} disabled={status === 'loading'}>
          <RefreshCw size={17} />
          <span>{status === 'loading' ? 'Refreshing' : 'Refresh API'}</span>
          <strong>{visible}</strong>
        </button>
      </div>

      <button className="primary-button sidebar-create" type="button" onClick={onAddContact}>
        <Plus size={18} />
        New Contact
      </button>
    </aside>
  )
}

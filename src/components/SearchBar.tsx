import { RefreshCw, Search } from 'lucide-react'

type SearchBarProps = {
  query: string
  status: string
  onRefresh: () => void
  onSearch: (query: string) => void
}

export function SearchBar({ query, status, onRefresh, onSearch }: SearchBarProps) {
  return (
    <div className="toolbar">
      <label className="search-field">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search name, email, city..."
        />
      </label>

      <button className="secondary-button" type="button" onClick={onRefresh} disabled={status === 'loading'}>
        <RefreshCw size={18} />
        {status === 'loading' ? 'Loading' : 'Refresh'}
      </button>
    </div>
  )
}

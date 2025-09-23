
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  availableFilters: { label: string; value: string; count?: number }[];
  placeholder?: string;
  className?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedFilters,
  onFilterToggle,
  availableFilters,
  placeholder = "Search...",
  className = ""
}) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  const clearAllFilters = () => {
    selectedFilters.forEach(filter => onFilterToggle(filter));
  };

  const hasActiveFilters = selectedFilters.length > 0 || searchTerm.length > 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      {availableFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {availableFilters.map((filter) => {
              const isSelected = selectedFilters.includes(filter.value);
              return (
                <Badge
                  key={filter.value}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-aticom-blue hover:bg-aticom-blue/90"
                      : "hover:bg-aticom-blue/10 hover:border-aticom-blue"
                  }`}
                  onClick={() => onFilterToggle(filter.value)}
                >
                  {filter.label}
                  {filter.count !== undefined && (
                    <span className="ml-1 text-xs opacity-70">
                      ({filter.count})
                    </span>
                  )}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="text-xs text-gray-500">
          {searchTerm && (
            <span>
              Searching for "{searchTerm}"
              {selectedFilters.length > 0 && " • "}
            </span>
          )}
          {selectedFilters.length > 0 && (
            <span>
              {selectedFilters.length} filter{selectedFilters.length === 1 ? '' : 's'} active
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;

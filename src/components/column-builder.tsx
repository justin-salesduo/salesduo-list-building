'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, X, Table } from 'lucide-react';

export interface ColumnDefinition {
  id: string;
  name: string;
  dataType: 'text' | 'number' | 'email' | 'phone' | 'url' | 'date';
  description?: string;
}

const dataTypes = [
  { value: 'text' as const, label: 'Text' },
  { value: 'number' as const, label: 'Number' },
  { value: 'email' as const, label: 'Email' },
  { value: 'phone' as const, label: 'Phone' },
  { value: 'url' as const, label: 'URL' },
  { value: 'date' as const, label: 'Date' },
];

const templates = {
  blank: {
    name: 'Blank (Start from scratch)',
    columns: [],
  },
  basic: {
    name: 'Basic',
    columns: [
      { name: 'Name', dataType: 'text' as const, description: '' },
      { name: 'Job Title', dataType: 'text' as const, description: '' },
      { name: 'LinkedIn URL', dataType: 'url' as const, description: '' },
      { name: 'Email', dataType: 'email' as const, description: '' },
      { name: 'Company Name', dataType: 'text' as const, description: '' },
      { name: 'Company Website', dataType: 'url' as const, description: '' },
      { name: 'Company LinkedIn URL', dataType: 'url' as const, description: '' },
    ],
  },
  standard: {
    name: 'Standard',
    columns: [
      { name: 'Name', dataType: 'text' as const, description: '' },
      { name: 'Job Title', dataType: 'text' as const, description: '' },
      { name: 'LinkedIn URL', dataType: 'url' as const, description: '' },
      { name: 'Email', dataType: 'email' as const, description: '' },
      { name: 'Phone Number', dataType: 'phone' as const, description: 'Verified' },
      { name: 'Company Name', dataType: 'text' as const, description: '' },
      { name: 'Company Website', dataType: 'url' as const, description: '' },
      { name: 'Company LinkedIn URL', dataType: 'url' as const, description: '' },
      { name: 'Company Size', dataType: 'number' as const, description: 'Number of employees' },
      { name: 'Industry', dataType: 'text' as const, description: '' },
      { name: 'Location', dataType: 'text' as const, description: 'City, State/Country' },
      { name: 'Tech Stack', dataType: 'text' as const, description: 'Technologies used' },
    ],
  },
  advanced: {
    name: 'Advanced',
    columns: [
      { name: 'Name', dataType: 'text' as const, description: '' },
      { name: 'Job Title', dataType: 'text' as const, description: '' },
      { name: 'LinkedIn URL', dataType: 'url' as const, description: '' },
      { name: 'Email', dataType: 'email' as const, description: '' },
      { name: 'Phone Number', dataType: 'phone' as const, description: 'Verified' },
      { name: 'Department', dataType: 'text' as const, description: '' },
      { name: 'Company Name', dataType: 'text' as const, description: '' },
      { name: 'Company Website', dataType: 'url' as const, description: '' },
      { name: 'Company LinkedIn URL', dataType: 'url' as const, description: '' },
      { name: 'Company Size', dataType: 'number' as const, description: 'Number of employees' },
      { name: 'Industry', dataType: 'text' as const, description: '' },
      { name: 'Location', dataType: 'text' as const, description: 'City, State/Country' },
      { name: 'Tech Stack', dataType: 'text' as const, description: 'Technologies used' },
      { name: 'Funding Stage', dataType: 'text' as const, description: 'e.g., Series A, B, C' },
      { name: 'Recent Activity', dataType: 'text' as const, description: 'Hiring, expansion, news' },
      { name: 'Intent Signals', dataType: 'text' as const, description: 'Buying signals detected' },
      { name: 'Data Source', dataType: 'text' as const, description: 'Multi-source verification' },
    ],
  },
};

interface ColumnBuilderProps {
  columns: ColumnDefinition[];
  onChange: (columns: ColumnDefinition[]) => void;
  showValidation?: boolean;
}

export function ColumnBuilder({ columns, onChange, showValidation }: ColumnBuilderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>('blank');
  const tableRef = useRef<HTMLTableElement>(null);

  // Auto-resize all textareas when columns change
  useEffect(() => {
    if (tableRef.current) {
      const textareas = tableRef.current.querySelectorAll('textarea');
      textareas.forEach((textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    }
  }, [columns]);

  const addColumn = () => {
    const newColumn: ColumnDefinition = {
      id: `col_${Date.now()}`,
      name: '',
      dataType: 'text',
      description: '',
    };
    onChange([...columns, newColumn]);
  };

  const removeColumn = (id: string) => {
    onChange(columns.filter((col) => col.id !== id));
  };

  const updateColumn = (
    id: string,
    field: keyof ColumnDefinition,
    value: string
  ) => {
    onChange(
      columns.map((col) =>
        col.id === id ? { ...col, [field]: value } : col
      )
    );
  };

  const loadTemplate = (templateKey: keyof typeof templates) => {
    if (templateKey === 'blank') {
      onChange([]);
      setSelectedTemplate('blank');
      return;
    }

    const template = templates[templateKey];
    const newColumns: ColumnDefinition[] = template.columns.map((col, index) => ({
      id: `col_${Date.now()}_${index}`,
      ...col,
    }));

    onChange(newColumns);
    setSelectedTemplate(templateKey);
  };

  const clearAll = () => {
    if (columns.length > 0) {
      if (confirm('Are you sure you want to clear all columns?')) {
        onChange([]);
        setSelectedTemplate('blank');
      }
    }
  };

  return (
    <div className="p-8 bg-surface border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-background border border-border rounded-lg">
          <Table className="w-5 h-5 text-text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            Define Your Output Columns *
          </h3>
          <p className="text-sm text-text-secondary">
            Specify the exact data fields you need for each lead
          </p>
        </div>
      </div>

      {/* Template Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Start with a Template (Optional)
        </label>
        <div className="relative w-full md:w-auto inline-block">
          <select
            value={selectedTemplate}
            onChange={(e) => loadTemplate(e.target.value as keyof typeof templates)}
            className="w-full md:w-auto px-4 py-2 pr-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary appearance-none"
          >
            <option value="blank">{templates.blank.name}</option>
            <option value="basic">{templates.basic.name}</option>
            <option value="standard">{templates.standard.name}</option>
            <option value="advanced">{templates.advanced.name}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Column Table */}
      {columns.length > 0 ? (
        <div className="mb-6 overflow-x-auto">
          <table ref={tableRef} className="w-full border border-border rounded-lg overflow-hidden">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary border-b border-border">
                  Column Name/Example
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary border-b border-border">
                  Data Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary border-b border-border">
                  Description
                </th>
                <th className="px-4 py-3 w-16 border-b border-border"></th>
              </tr>
            </thead>
            <tbody className="bg-background">
              {columns.map((column, index) => (
                <tr
                  key={column.id}
                  className="border-b border-border last:border-b-0 hover:bg-surface transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={column.name}
                      onChange={(e) => updateColumn(column.id, 'name', e.target.value)}
                      placeholder="e.g., Company Name, Job Title"
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <select
                        value={column.dataType}
                        onChange={(e) =>
                          updateColumn(
                            column.id,
                            'dataType',
                            e.target.value as ColumnDefinition['dataType']
                          )
                        }
                        className="w-full px-3 py-2 pr-8 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm appearance-none"
                      >
                        {dataTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      value={column.description || ''}
                      onChange={(e) =>
                        updateColumn(column.id, 'description', e.target.value)
                      }
                      placeholder="Optional context"
                      rows={1}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm resize-none overflow-hidden"
                      style={{
                        minHeight: '2.5rem',
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => removeColumn(column.id)}
                      className="p-2 hover:bg-surface rounded-lg transition-colors text-text-muted hover:text-text-primary"
                      aria-label="Remove column"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mb-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
          <Table className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary mb-2">No columns defined yet</p>
          <p className="text-sm text-text-muted">
            Click "Add Column" below or select a template to get started
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={addColumn}
          className="inline-flex items-center gap-2 px-6 py-3 bg-cta text-white rounded-lg font-medium hover:bg-cta-hover transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Column
        </button>

        {columns.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="px-6 py-3 bg-background text-text-secondary border border-border rounded-lg font-medium hover:border-accent hover:text-text-primary transition-colors"
          >
            Clear All
          </button>
        )}

        <div className="ml-auto text-sm text-text-muted">
          {columns.length} {columns.length === 1 ? 'column' : 'columns'} defined
        </div>
      </div>

      {/* Help Text */}
      <p className="mt-4 text-sm text-text-muted">
        💡 Tip: Be specific with column names and descriptions. This helps us
        deliver exactly what you need.
      </p>

      {/* Validation */}
      {showValidation && (
        <p className="mt-2 text-xs text-red-500">
          * At least one column is required
        </p>
      )}
    </div>
  );
}

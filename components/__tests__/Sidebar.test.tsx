import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from '../Sidebar';

// Mock FUNCTIONS constant
jest.mock('../../constants', () => ({
  FUNCTIONS: [
    {
      id: 'read_csv',
      name: 'pd.read_csv',
      category: 'Cleaning',
      description: '文件图标展开成表格',
      businessLogic: '读取原始数据文件',
      codePrototype: "df = pd.read_csv('data.csv')",
    },
    {
      id: 'drop_duplicates',
      name: 'drop_duplicates',
      category: 'Cleaning',
      description: '重复的行发生碎裂并消失',
      businessLogic: '移除数据中的重复记录',
      codePrototype: 'df.drop_duplicates()',
    },
  ],
  COLORS: {
    red: '#EF4444',
    green: '#10B981',
    blue: '#3B82F6',
    orange: '#F59E0B',
    dark: '#1F2937',
    text: '#F3F4F6',
  },
}));

describe('Sidebar Component', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe('Rendering', () => {
    it('should render the component', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      expect(screen.getByText('Function Lab')).toBeInTheDocument();
    });

    it('should render search input', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('aria-label', '搜索函数');
    });

    it('should render all function categories', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      expect(screen.getByText('Cleaning')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should filter functions by name', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: 'csv' } });

      expect(screen.getByText('pd.read_csv')).toBeInTheDocument();
      expect(screen.queryByText('drop_duplicates')).not.toBeInTheDocument();
    });

    it('should filter functions by ID', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: 'read' } });

      expect(screen.getByText('pd.read_csv')).toBeInTheDocument();
    });

    it('should filter functions by description', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: '文件' } });

      expect(screen.getByText('pd.read_csv')).toBeInTheDocument();
    });

    it('should show "no results" message when no matches found', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

      expect(screen.getByText('未找到匹配的函数')).toBeInTheDocument();
      expect(screen.getByText('请尝试其他关键词')).toBeInTheDocument();
    });

    it('should show result count when searching', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: 'drop' } });

      expect(screen.getByText(/找到 \d+ 个函数/)).toBeInTheDocument();
    });

    it('should clear search when X button is clicked', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

      fireEvent.change(searchInput, { target: { value: 'csv' } });
      expect(searchInput.value).toBe('csv');

      const clearButton = screen.getByLabelText('清除搜索');
      fireEvent.click(clearButton);

      expect(searchInput.value).toBe('');
    });

    it('should limit search input to MAX_SEARCH_LENGTH', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

      const longValue = 'a'.repeat(150);
      fireEvent.change(searchInput, { target: { value: longValue } });

      expect(searchInput.value.length).toBeLessThanOrEqual(100);
    });
  });

  describe('Function Selection', () => {
    it('should call onSelect when function is clicked', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);

      const readCsvButton = screen.getByText('pd.read_csv');
      fireEvent.click(readCsvButton);

      expect(mockOnSelect).toHaveBeenCalledWith('read_csv');
    });

    it('should highlight active function', () => {
      render(<Sidebar activeId="read_csv" onSelect={mockOnSelect} />);

      const readCsvButton = screen.getByText('pd.read_csv').closest('button');
      expect(readCsvButton).toHaveClass('border-r-2', 'border-blue-500');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);

      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toHaveAttribute('aria-label', '搜索函数');
    });

    it('should have clear button with aria-label', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: 'test' } });

      const clearButton = screen.getByLabelText('清除搜索');
      expect(clearButton).toBeInTheDocument();
    });

    it('should have decorative icon marked as aria-hidden', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);

      const searchIcon = document.querySelector('.lucide-search');
      expect(searchIcon?.closest('svg')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search query', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: '   ' } });

      expect(screen.getByText('pd.read_csv')).toBeInTheDocument();
      expect(screen.getByText('drop_duplicates')).toBeInTheDocument();
    });

    it('should handle case-insensitive search', () => {
      render(<Sidebar activeId="" onSelect={mockOnSelect} />);
      const searchInput = screen.getByRole('searchbox');

      fireEvent.change(searchInput, { target: { value: 'CSV' } });
      expect(screen.getByText('pd.read_csv')).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: 'csv' } });
      expect(screen.getByText('pd.read_csv')).toBeInTheDocument();
    });
  });
});

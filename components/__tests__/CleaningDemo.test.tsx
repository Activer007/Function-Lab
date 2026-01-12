import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CleaningDemo } from '../demos/CleaningDemo';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('CleaningDemo Component', () => {
  describe('read_csv visualization', () => {
    it('should render file icon initially', () => {
      render(<CleaningDemo functionId="read_csv" />);
      expect(screen.getByText(/Click to read_csv/i)).toBeInTheDocument();
      expect(screen.getByText('data.csv')).toBeInTheDocument();
    });

    it('should expand table when file icon is clicked', async () => {
      render(<CleaningDemo functionId="read_csv" />);

      const fileIcon = screen.getByText(/Click to read_csv/i).closest('div');
      fireEvent.click(fileIcon!);

      await waitFor(() => {
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Score')).toBeInTheDocument();
      });
    });

    it('should display mock data correctly', async () => {
      render(<CleaningDemo functionId="read_csv" />);

      const fileIcon = screen.getByText(/Click to read_csv/i).closest('div');
      fireEvent.click(fileIcon!);

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('Charlie')).toBeInTheDocument();
        expect(screen.getByText('95')).toBeInTheDocument();
        expect(screen.getByText('87')).toBeInTheDocument();
        expect(screen.getByText('92')).toBeInTheDocument();
      });
    });

    it('should show reset button when expanded', async () => {
      render(<CleaningDemo functionId="read_csv" />);

      const fileIcon = screen.getByText(/Click to read_csv/i).closest('div');
      fireEvent.click(fileIcon!);

      await waitFor(() => {
        expect(screen.getByText(/重置 read_csv/i)).toBeInTheDocument();
      });
    });

    it('should reset when reset button is clicked', async () => {
      render(<CleaningDemo functionId="read_csv" />);

      // Expand
      const fileIcon = screen.getByText(/Click to read_csv/i).closest('div');
      fireEvent.click(fileIcon!);

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument();
      });

      // Reset
      const resetButton = screen.getByText(/重置 read_csv/i);
      fireEvent.click(resetButton);

      await waitFor(() => {
        expect(screen.getByText(/Click to read_csv/i)).toBeInTheDocument();
      });
    });

    it('should show success message after loading', async () => {
      render(<CleaningDemo functionId="read_csv" />);

      const fileIcon = screen.getByText(/Click to read_csv/i).closest('div');
      fireEvent.click(fileIcon!);

      await waitFor(
        () => {
          expect(screen.getByText(/Successfully loaded 3 rows/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  describe('drop_duplicates visualization', () => {
    it('should render execute button', () => {
      render(<CleaningDemo functionId="drop_duplicates" />);
      expect(screen.getByText(/Execute drop_duplicates/i)).toBeInTheDocument();
    });

    it('should show all rows initially', () => {
      render(<CleaningDemo functionId="drop_duplicates" />);

      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
    });

    it('should remove duplicate when button clicked', () => {
      render(<CleaningDemo functionId="drop_duplicates" />);

      const executeButton = screen.getByText(/Execute drop_duplicates/i);
      fireEvent.click(executeButton);

      // After removing duplicate, should only see 3 rows
      const aliceElements = screen.getAllByText('Alice');
      expect(aliceElements).toHaveLength(1);
    });
  });

  describe('fillna visualization', () => {
    it('should render execute button', () => {
      render(<CleaningDemo functionId="fillna" />);
      expect(screen.getByText(/Execute fillna/i)).toBeInTheDocument();
    });

    it('should fill null values when button clicked', () => {
      render(<CleaningDemo functionId="fillna" />);

      const executeButton = screen.getByText(/Execute fillna/i);
      fireEvent.click(executeButton);

      // Should show filled values
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('dropna visualization', () => {
    it('should render execute button', () => {
      render(<CleaningDemo functionId="dropna" />);
      expect(screen.getByText(/Execute dropna/i)).toBeInTheDocument();
    });
  });

  describe('isnull visualization', () => {
    it('should not show execute button', () => {
      render(<CleaningDemo functionId="isnull" />);
      expect(screen.queryByText(/Execute isnull/i)).not.toBeInTheDocument();
    });

    it('should show TRUE for null values', () => {
      render(<CleaningDemo functionId="isnull" />);
      expect(screen.getByText('TRUE')).toBeInTheDocument();
    });
  });

  describe('State reset when functionId changes', () => {
    it('should reset state when switching from read_csv to drop_duplicates', async () => {
      const { rerender } = render(<CleaningDemo functionId="read_csv" />);

      // Expand read_csv
      const fileIcon = screen.getByText(/Click to read_csv/i).closest('div');
      fireEvent.click(fileIcon!);

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument();
      });

      // Switch to drop_duplicates
      rerender(<CleaningDemo functionId="drop_duplicates" />);

      // Should show drop_duplicates button, not read_csv table
      expect(screen.getByText(/Execute drop_duplicates/i)).toBeInTheDocument();
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });
});

describe('Constants and Types', () => {
  it('READ_CSV_MOCK_DATA should have correct structure', () => {
    const { READ_CSV_MOCK_DATA } = require('../demos/CleaningDemo');

    expect(READ_CSV_MOCK_DATA).toEqual([
      { id: 1, name: 'Alice', score: 95 },
      { id: 2, name: 'Bob', score: 87 },
      { id: 3, name: 'Charlie', score: 92 },
    ]);
  });

  it('DROP_DUPLICATES_INITIAL_DATA should have correct structure', () => {
    const { DROP_DUPLICATES_INITIAL_DATA } = require('../demos/CleaningDemo');

    expect(DROP_DUPLICATES_INITIAL_DATA).toHaveLength(4);
    expect(DROP_DUPLICATES_INITIAL_DATA[0]).toMatchObject({
      id: expect.any(Number),
      val: expect.any(String),
      status: expect.any(String),
    });
  });
});

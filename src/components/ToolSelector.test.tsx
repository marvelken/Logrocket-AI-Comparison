import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToolSelector from './ToolSelector';
import { toolData, getAIModels, getDevelopmentTools } from '../lib/data';

describe('ToolSelector Component Tests', () => {
  const mockOnCompare = vi.fn();

  it('renders the heading "AI Development Tools"', () => {
    render(<ToolSelector onCompare={mockOnCompare} />);
    const heading = screen.getByText('AI Development Tools');
    expect(heading).toBeInTheDocument();
  });

  it('shows AI Models section by default', () => {
    render(<ToolSelector onCompare={mockOnCompare} />);

    // Check that the AI Models button is active
    const aiModelsButton = screen.getByRole('button', { name: /AI Models/i });
    expect(aiModelsButton).toHaveClass('bg-gradient-to-r');

    // Check that AI model cards are visible
    const aiModels = getAIModels();
    const firstAIModel = Object.values(aiModels)[0];
    expect(screen.getByText(firstAIModel.name)).toBeInTheDocument();
  });

  it('clicking "Dev Tools" tab switches the visible section', async () => {
    const user = userEvent.setup();
    render(<ToolSelector onCompare={mockOnCompare} />);

    // Click the Dev Tools button
    const devToolsButton = screen.getByRole('button', { name: /Dev Tools/i });
    await user.click(devToolsButton);

    // Check that the Dev Tools button is now active
    expect(devToolsButton).toHaveClass('bg-gradient-to-r');

    // Check that dev tool cards are visible
    const devTools = getDevelopmentTools();
    const firstDevTool = Object.values(devTools)[0];
    expect(screen.getByText(firstDevTool.name)).toBeInTheDocument();
  });

  it('selecting a tool adds it to selected count', async () => {
    const user = userEvent.setup();
    render(<ToolSelector onCompare={mockOnCompare} />);

    // Initially, 0 tools selected
    expect(screen.getByText(/0 of 4 tools selected/i)).toBeInTheDocument();

    // Click on first AI model
    const aiModels = getAIModels();
    const firstAIModelName = Object.values(aiModels)[0].name;
    const firstCard = screen.getByText(firstAIModelName).closest('div');
    await user.click(firstCard!);

    // Check that 1 tool is selected
    expect(screen.getByText(/1 of 4 tools selected/i)).toBeInTheDocument();
  });

  it('cannot select more than 4 tools — selecting a 5th replaces the first', async () => {
    const user = userEvent.setup();
    render(<ToolSelector onCompare={mockOnCompare} />);

    const aiModels = getAIModels();
    const aiModelIds = Object.keys(aiModels);
    const aiModelNames = aiModelIds.slice(0, 5).map(id => aiModels[id].name);

    // Select first 4 tools
    for (let i = 0; i < 4; i++) {
      const card = screen.getByText(aiModelNames[i]).closest('div');
      await user.click(card!);
    }

    // Check that 4 tools are selected
    expect(screen.getByText(/4 of 4 tools selected/i)).toBeInTheDocument();

    // Select a 5th tool
    const fifthCard = screen.getByText(aiModelNames[4]).closest('div');
    await user.click(fifthCard!);

    // Should still show 4 tools selected
    expect(screen.getByText(/4 of 4 tools selected/i)).toBeInTheDocument();
  });

  it('Compare button is disabled when fewer than 2 tools selected', () => {
    render(<ToolSelector onCompare={mockOnCompare} />);

    const compareButton = screen.getByRole('button', { name: /Compare Selected/i });
    expect(compareButton).toBeDisabled();
    expect(compareButton).toHaveClass('cursor-not-allowed');
  });

  it('Compare button enables when 2+ tools are selected', async () => {
    const user = userEvent.setup();
    render(<ToolSelector onCompare={mockOnCompare} />);

    const aiModels = getAIModels();
    const aiModelNames = Object.values(aiModels).slice(0, 2).map(m => m.name);

    // Select 2 tools
    for (const name of aiModelNames) {
      const card = screen.getByText(name).closest('div');
      await user.click(card!);
    }

    const compareButton = screen.getByRole('button', { name: /Compare Selected/i });
    expect(compareButton).not.toBeDisabled();
    expect(compareButton).not.toHaveClass('cursor-not-allowed');
  });

  it('onCompare callback is called with correct tool IDs when Compare is clicked', async () => {
    const user = userEvent.setup();
    render(<ToolSelector onCompare={mockOnCompare} />);

    const aiModels = getAIModels();
    const aiModelIds = Object.keys(aiModels).slice(0, 2);

    // Select 2 tools
    for (const id of aiModelIds) {
      const name = aiModels[id].name;
      const card = screen.getByText(name).closest('div');
      await user.click(card!);
    }

    // Click Compare button
    const compareButton = screen.getByRole('button', { name: /Compare Selected/i });
    await user.click(compareButton);

    // Check that onCompare was called with correct IDs
    expect(mockOnCompare).toHaveBeenCalledTimes(1);
    const calledWith = mockOnCompare.mock.calls[0][0];
    expect(calledWith).toHaveLength(2);
    expect(aiModelIds).toEqual(expect.arrayContaining(calledWith));
  });

  it('deselecting a tool removes it from selection', async () => {
    const user = userEvent.setup();
    render(<ToolSelector onCompare={mockOnCompare} />);

    const aiModels = getAIModels();
    const firstAIModelName = Object.values(aiModels)[0].name;
    const firstCard = screen.getByText(firstAIModelName).closest('div');

    // Select tool
    await user.click(firstCard!);
    expect(screen.getByText(/1 of 4 tools selected/i)).toBeInTheDocument();

    // Deselect tool
    await user.click(firstCard!);
    expect(screen.getByText(/0 of 4 tools selected/i)).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import {
  toolData,
  getAIModels,
  getDevelopmentTools,
  getToolsByCategory,
  getRelevantFeatureCategories,
  aiModelCategories,
  developmentToolCategories,
} from './data';

describe('data.ts - Unit Tests', () => {
  describe('getAIModels', () => {
    it('returns only tools where type === "AI Model"', () => {
      const aiModels = getAIModels();
      const allToolsAreAIModels = Object.values(aiModels).every(
        (tool) => tool.type === 'AI Model'
      );
      expect(allToolsAreAIModels).toBe(true);
      expect(Object.keys(aiModels).length).toBeGreaterThan(0);
    });

    it('does not include Development Tools', () => {
      const aiModels = getAIModels();
      const hasDevTools = Object.values(aiModels).some(
        (tool) => tool.type === 'Development Tool'
      );
      expect(hasDevTools).toBe(false);
    });
  });

  describe('getDevelopmentTools', () => {
    it('returns only tools where type === "Development Tool"', () => {
      const devTools = getDevelopmentTools();
      const allToolsAreDevTools = Object.values(devTools).every(
        (tool) => tool.type === 'Development Tool'
      );
      expect(allToolsAreDevTools).toBe(true);
      expect(Object.keys(devTools).length).toBeGreaterThan(0);
    });

    it('does not include AI Models', () => {
      const devTools = getDevelopmentTools();
      const hasAIModels = Object.values(devTools).some(
        (tool) => tool.type === 'AI Model'
      );
      expect(hasAIModels).toBe(false);
    });
  });

  describe('getToolsByCategory', () => {
    it('filters correctly by category string', () => {
      const generalPurposeTools = getToolsByCategory('General Purpose AI');
      const allMatchCategory = Object.values(generalPurposeTools).every(
        (tool) => tool.category === 'General Purpose AI'
      );
      expect(allMatchCategory).toBe(true);
    });

    it('returns empty object for non-existent category', () => {
      const result = getToolsByCategory('Non Existent Category');
      expect(Object.keys(result).length).toBe(0);
    });

    it('filters IDE Integration tools correctly', () => {
      const ideTools = getToolsByCategory('IDE Integration');
      const allMatchCategory = Object.values(ideTools).every(
        (tool) => tool.category === 'IDE Integration'
      );
      expect(allMatchCategory).toBe(true);
    });
  });

  describe('getRelevantFeatureCategories', () => {
    it('returns aiModelCategories when only AI models selected', () => {
      const aiModelIds = Object.keys(toolData).filter(
        (id) => toolData[id].type === 'AI Model'
      );
      const selectedAIModels = [aiModelIds[0], aiModelIds[1]];
      const result = getRelevantFeatureCategories(selectedAIModels);

      expect(result).toEqual(aiModelCategories);
    });

    it('returns developmentToolCategories when only dev tools selected', () => {
      const devToolIds = Object.keys(toolData).filter(
        (id) => toolData[id].type === 'Development Tool'
      );
      const selectedDevTools = [devToolIds[0], devToolIds[1]];
      const result = getRelevantFeatureCategories(selectedDevTools);

      expect(result).toEqual(developmentToolCategories);
    });

    it('returns both merged when mixed selection', () => {
      const aiModelId = Object.keys(toolData).find(
        (id) => toolData[id].type === 'AI Model'
      );
      const devToolId = Object.keys(toolData).find(
        (id) => toolData[id].type === 'Development Tool'
      );

      const result = getRelevantFeatureCategories([aiModelId!, devToolId!]);

      // Should contain keys from both categories
      const hasAICategories = Object.keys(aiModelCategories).some((key) =>
        Object.keys(result).includes(key)
      );
      const hasDevCategories = Object.keys(developmentToolCategories).some(
        (key) => Object.keys(result).includes(key)
      );

      expect(hasAICategories).toBe(true);
      expect(hasDevCategories).toBe(true);
    });

    it('returns aiModelCategories when no tools selected (default)', () => {
      const result = getRelevantFeatureCategories([]);
      expect(result).toEqual(aiModelCategories);
    });
  });

  describe('toolData validation', () => {
    it('every tool has a name, type, description, and features object', () => {
      Object.entries(toolData).forEach(([id, tool]) => {
        expect(tool.name).toBeDefined();
        expect(typeof tool.name).toBe('string');
        expect(tool.name.length).toBeGreaterThan(0);

        expect(tool.type).toBeDefined();
        expect(['AI Model', 'Development Tool']).toContain(tool.type);

        expect(tool.description).toBeDefined();
        expect(typeof tool.description).toBe('string');
        expect(tool.description.length).toBeGreaterThan(0);

        expect(tool.features).toBeDefined();
        expect(typeof tool.features).toBe('object');
      });
    });

    it('every tool has at least one feature', () => {
      Object.entries(toolData).forEach(([id, tool]) => {
        expect(Object.keys(tool.features).length).toBeGreaterThan(0);
      });
    });

    it('feature values are boolean or string', () => {
      Object.entries(toolData).forEach(([id, tool]) => {
        Object.values(tool.features).forEach((featureValue) => {
          const isValidType =
            typeof featureValue === 'boolean' ||
            typeof featureValue === 'string';
          expect(isValidType).toBe(true);
        });
      });
    });
  });
});

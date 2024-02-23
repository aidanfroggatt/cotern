const { getDefaultConfig } = require('@expo/metro-config');

jest.mock('@expo/metro-config', () => ({
    getDefaultConfig: jest.fn(),
}));

const defaultConfigMock = {
    resolver: {
        sourceExts: ['.js', '.json', '.ts', '.tsx', '.cjs'], // Example extension array after modification
    },
};

describe('metro.config.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should extend sourceExts array with .cjs extension', () => {
        // Arrange
        getDefaultConfig.mockReturnValue(defaultConfigMock);
        const metroConfig = require('../metro.config');

        // Assert
        expect(getDefaultConfig).toHaveBeenCalledWith(expect.any(String));
        expect(metroConfig.resolver.sourceExts).toContain('.cjs');
    });

    // Add more test cases as needed
});

const tailwindConfig = require('.././tailwind.config');

describe('Tailwind CSS Config', () => {
    it('should have content paths defined', () => {
        expect(tailwindConfig.content).toBeDefined();
        expect(Array.isArray(tailwindConfig.content)).toBe(true);
        expect(tailwindConfig.content).toContain("./App.{js,jsx,ts,tsx}");
        expect(tailwindConfig.content).toContain("./components/**/*.{js,jsx,ts,tsx}");
        expect(tailwindConfig.content).toContain("./pages/**/*.{js,jsx,ts,tsx}");
        // Add more assertions as needed for other content paths
    });

    it('should have theme defined with primary, secondary, and accent colors extended', () => {
        expect(tailwindConfig.theme).toBeDefined();
        expect(tailwindConfig.theme.extend).toBeDefined();
        expect(tailwindConfig.theme.extend.colors).toBeDefined();
        expect(tailwindConfig.theme.extend.colors.primary).toBe('#FFFFFF');
        expect(tailwindConfig.theme.extend.colors.secondary).toBe('#000000');
        expect(tailwindConfig.theme.extend.colors.accent).toBe('#6366f1');
        // Add more assertions as needed for other extended theme properties
    });

    it('should not have any plugins defined', () => {
        expect(tailwindConfig.plugins).toBeDefined();
        expect(Array.isArray(tailwindConfig.plugins)).toBe(true);
        expect(tailwindConfig.plugins).toHaveLength(0);
    });
});

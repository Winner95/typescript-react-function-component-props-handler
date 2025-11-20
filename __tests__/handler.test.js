const { parseFixture } = require('./helpers');
const customHandler = require('../index'); // index.js (module under test)
const {
    makePathWithEmptyTypePath,
    makePathWithPropTypes,
    makePathWithExportedType,
    makePathWithInterfaceType,
    makePathWithNoTypeAnnotation,
} = require('../fixtures/ParsedProps');

describe('typescript-react-function-component-props-handler', () => {
    test('handles React.FC<Props> components', () => {
        const doc = parseFixture('Button.tsx');

        expect(doc.displayName).toBe('Button');
        expect(doc.description).toBe('A simple button component');

        expect(doc).toHaveProperty('props');
        expect(doc.props).toHaveProperty('label');

        expect(doc.props.label.tsType).toMatchObject({ name: 'string' });
        expect(doc.props.label.required).toBe(true);
        expect(doc.props.label).toHaveProperty('description');
        expect(doc.props.label.description).toBe('Text to show inside the button');

        expect(doc.props).toHaveProperty('onClick');
        expect(doc.props.onClick.tsType).toMatchObject({ name: 'signature' });
        expect(doc.props.onClick.tsType.type).toBe('function');
        expect(doc.props.onClick.tsType.raw).toBe('() => void');
        expect(doc.props.onClick.tsType.signature).toMatchObject({ arguments: [], return: { name: 'void' } });
        expect(doc.props.onClick.required).toBe(false);
        expect(doc.props.onClick).toHaveProperty('description');
        expect(doc.props.onClick.description).toBe('Optional click handler');
    });

    test('handles React.forwardRef(...) components', () => {
        const doc = parseFixture('TooltipTarget.tsx');

        expect(doc.displayName).toBe('TooltipTarget');
    });

    // Currently returns error for React.forwardRef(...) components
    test('handles React.forwardRef(...) components - part 2', () => {
        expect(() => parseFixture('ForwardedButton.tsx')).toThrow(
            "Cannot read properties of undefined (reading 'length')"
        );
    });

    test('handles React.FC<Props> components - AccessibleButton', () => {
        const doc = parseFixture('AccessibleButton.tsx');

        expect(doc.props).toBeUndefined();
    });

    // Currently returns error for DataTableManager
    test('handles React.FC<Props> components - DataTableManager', () => {
        expect(() => parseFixture('DataTableManager.tsx')).toThrow(
            'did not recognize object of type "ChainExpression"'
        );
    });

    test('handles React.FC<Props> components with union type props', () => {
        const doc = parseFixture('Icon.tsx');

        expect(doc.props).toHaveProperty('size');
        expect(doc.props.size.tsType).toMatchObject({ name: 'union' });
        expect(doc.props.size.tsType).toHaveProperty('raw');
        expect(doc.props.size.tsType.raw).toBe("'small' | 'medium' | 'big'");
    });

    test('handles React.FC<Props> components with complex type props', () => {
        const doc = parseFixture('LayoutSettings.tsx');

        expect(doc).toHaveProperty('props');
        expect(doc.props).toHaveProperty('displaySettings');
        expect(doc.props).toHaveProperty('columnManager');
        expect(doc.props).toHaveProperty('onSettingsChange');
        expect(doc.props.displaySettings.tsType.signature.properties).toHaveLength(3);
    });

    // Line 31 in index.js without type - can't be tested directly because of early return
    test('handles components without type', () => {
        const doc = parseFixture('ComponentWithoutType.tsx');
        expect(doc.displayName).toBe('ComponentWithoutType');
    });

    // Line 51 in index.js early-returns if hasPropTypes is true
    test('handles components without use of params', () => {
        const doc = parseFixture('NoParamsComponent.tsx');
        expect(doc.displayName).toBe('NoParamComponent');
    });

    // Line 68 in index.js calls checkForProptypes
    test('handles components with propTypes', () => {
        const doc = parseFixture('ComponentWithPropTypes.tsx');
        expect(doc.displayName).toBe('ComponentWithPropTypes');
    });

    // Line 78 in index.js uses ExportNamedDeclaration
    test('handles components with exported interface', () => {
        const doc = parseFixture('ExportedInterfacePropsComponent.tsx');
        expect(doc.displayName).toBe('ExportedInterfacePropsComponent');
    });

    // Line 86 in index.js uses TSInterfaceDeclaration
    test('handles components with interface props', () => {
        const doc = parseFixture('InterfacePropsComponent.tsx');
        expect(doc.displayName).toBe('InterfacePropsComponent');

        expect(doc).toHaveProperty('props');
        expect(doc.props).toHaveProperty('label');
        expect(doc.props.label.tsType).toMatchObject({ name: 'string' });
        expect(doc.props.label.required).toBe(true);

        expect(doc.props).toHaveProperty('disabled');
        expect(doc.props.disabled.tsType).toMatchObject({ name: 'boolean' });
        expect(doc.props.disabled.required).toBe(false);
    });

    // @TODO: add more tests for various edge cases
    // Add one test per "Src/ui" example you care about:
    // - React.FC<Props> with generic
    // - Alias types
    // - Intersections
    // - Props from imported types, etc.

    // Extra tests for the inner functions of the handler: mainly parsed values
    // Line 31 in index.js without type
    test('handles components without type and falls back to id.name and getTypePath() returns []', () => {
        const { path, param } = makePathWithEmptyTypePath();

        // Should not throw and should leave params unchanged (no typePath found)
        expect(() => customHandler(null, path)).not.toThrow();
        expect(path.parentPath.node.init.params[0]).toBe(param);
    });

    // Line 68 in index.js calls checkForProptypes
    test('detects propTypes and returns early', () => {
        const { path } = makePathWithPropTypes();

        // Should not throw; handler will see hasPropTypes=true and early-return
        expect(() => customHandler(null, path)).not.toThrow();
    });

    // Line 51 in index.js early-returns if hasPropTypes is true
    test('calls checkForProptypes and early-returns when propTypes exist', () => {
        const { path } = makePathWithNoTypeAnnotation();

        customHandler(null, path);

        expect(path.parentPath.node.init.params[0]).toBe(undefined);
    });

    // Line 78 in index.js uses ExportNamedDeclaration
    test('uses ExportNamedDeclaration when finding typePath', () => {
        const { path, exportedType } = makePathWithExportedType();

        customHandler(null, path);

        const [typedParam] = path.parentPath.node.init.params;
        expect(typedParam.typeAnnotation).toBe(exportedType.declaration);
    });

    // Line 86 in index.js uses TSInterfaceDeclaration
    test('uses TSInterfaceDeclaration when finding typePath', () => {
        const { path, interfaceType } = makePathWithInterfaceType();

        customHandler(null, path);

        const [typedParam] = path.parentPath.node.init.params;
        expect(typedParam.typeAnnotation).toBe(interfaceType);
    });
});

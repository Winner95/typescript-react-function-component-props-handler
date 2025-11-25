function makePathWithEmptyTypePath() {
    const param = {}; // no typeAnnotation on param
    const id = { name: 'ComponentWithoutType' }; // no id.typeAnnotation
    const init = { params: [param] };

    // Build parentPath chain so getTypePath() sees parentPath.parentPath... objects,
    // but none have a `.value` with .find -> it will return [].
    const parent4 = {}; // no `value`
    const parent3 = { parentPath: parent4 };
    const parent2 = { parentPath: parent3 };
    const parent1 = { parentPath: parent2, node: { id, init } };

    const path = {
        node: { type: 'ArrowFunctionExpression' },
        parentPath: parent1,
    };

    return { path, param };
}

function makePathWithPropTypes() {
    const param = {};
    const id = {
        name: 'ComponentWithPropTypes',
        typeAnnotation: {
            typeAnnotation: {
                typeParameters: {
                    params: [
                        {
                            typeName: { name: 'PropsType' },
                        },
                    ],
                },
            },
        },
    };
    const init = { params: [param] };

    const programBody = [
        {
            type: 'ExpressionStatement',
            expression: {
                left: { object: { name: 'PropsType' } },
                right: {
                    type: 'ObjectExpression',
                    properties: [{}],
                },
            },
        },
    ];

    // parentPath chain where parentPath.parentPath.parentPath.parentPath.value === programBody
    const parent4 = { value: programBody };
    const parent3 = { parentPath: parent4 };
    const parent2 = { parentPath: parent3 };
    const parent1 = { parentPath: parent2, node: { id, init } };

    const path = {
        node: { type: 'ArrowFunctionExpression' },
        parentPath: parent1,
    };

    return { path, programBody };
}

function makePathWithExportedType() {
    const param = {};
    const id = {
        name: 'ComponentWithExportedType',
        typeAnnotation: {
            typeAnnotation: {
                typeParameters: {
                    params: [
                        {
                            typeName: { name: 'ExportedProps' },
                        },
                    ],
                },
            },
        },
    };
    const init = { params: [param] };

    const exportedType = {
        type: 'ExportNamedDeclaration',
        declaration: {
            id: { name: 'ExportedProps' },
        },
    };

    const programBody = [exportedType];

    const parent4 = { value: programBody };
    const parent3 = { parentPath: parent4 };
    const parent2 = { parentPath: parent3 };
    const parent1 = { parentPath: parent2, node: { id, init } };

    const path = {
        node: { type: 'ArrowFunctionExpression' },
        parentPath: parent1,
    };

    return { path, exportedType };
}

function makePathWithInterfaceType() {
    const param = {};
    const id = {
        name: 'ComponentWithInterface',
        typeAnnotation: {
            typeAnnotation: {
                typeParameters: {
                    params: [
                        {
                            typeName: { name: 'InterfaceProps' },
                        },
                    ],
                },
            },
        },
    };
    const init = { params: [param] };

    const interfaceType = {
        type: 'TSInterfaceDeclaration',
        id: { name: 'InterfaceProps' },
    };

    const programBody = [interfaceType];

    const parent4 = { value: programBody };
    const parent3 = { parentPath: parent4 };
    const parent2 = { parentPath: parent3 };
    const parent1 = { parentPath: parent2, node: { id, init } };

    const path = {
        node: { type: 'ArrowFunctionExpression' },
        parentPath: parent1,
    };

    return { path, interfaceType };
}

function makePathWithNoTypeAnnotation() {
    // id WITHOUT typeAnnotation -> setParamTypeName() will use id.name (line 13)
    const id = { name: 'MyComponent' };

    const init = { params: [] };

    // This mimics: MyComponent.propTypes = { ... }
    const propsDefinition = {
        type: 'ExpressionStatement',
        expression: {
            left: {
                object: { name: 'MyComponent' } // must match paramTypeName
            },
            right: {
                type: 'ObjectExpression',
                properties: [{}], // truthy -> Boolean(properties) === true
            },
        },
    };

    // This is what getTypePath(path) will eventually return (.value)
    const programBody = [propsDefinition];

    // Build the .parentPath chain so that:
    // path.parentPath.parentPath.parentPath.parentPath.value === programBody
    const parent4 = { value: programBody };
    const parent3 = { parentPath: parent4 };
    const parent2 = { parentPath: parent3 };
    const parent1 = { parentPath: parent2, node: { id, init } };

    const path = {
        node: { type: 'ArrowFunctionExpression' },
        parentPath: parent1,
    };
    return { path };
}

module.exports = {
    makePathWithEmptyTypePath,
    makePathWithPropTypes,
    makePathWithExportedType,
    makePathWithInterfaceType,
    makePathWithNoTypeAnnotation
};

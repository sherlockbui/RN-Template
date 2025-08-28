const { setGenerator } = require('plop');

module.exports = function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['common', 'form', 'custom'],
      },
      {
        type: 'confirm',
        name: 'withStory',
        message: 'Create Storybook story?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Create test file?',
        default: true,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.styles.ts',
        templateFile: 'plop-templates/component/Component.styles.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.types.ts',
        templateFile: 'plop-templates/component/Component.types.ts.hbs',
      },
      ...(plop.getGenerator('component').answers.withStory ? [{
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/component/Component.stories.tsx.hbs',
      }] : []),
      ...(plop.getGenerator('component').answers.withTest ? [{
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}/__tests__/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/component/Component.test.tsx.hbs',
      }] : []),
    ],
  });

  // Screen generator
  plop.setGenerator('screen', {
    description: 'Create a new screen',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Screen name:',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Screen type:',
        choices: ['auth', 'app', 'custom'],
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Create test file?',
        default: true,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{type}}/{{pascalCase name}}Screen/{{pascalCase name}}Screen.tsx',
        templateFile: 'plop-templates/screen/Screen.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{type}}/{{pascalCase name}}Screen/{{pascalCase name}}Screen.styles.ts',
        templateFile: 'plop-templates/screen/Screen.styles.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{type}}/{{pascalCase name}}Screen/index.ts',
        templateFile: 'plop-templates/screen/index.ts.hbs',
      },
      ...(plop.getGenerator('screen').answers.withTest ? [{
        type: 'add',
        path: 'src/screens/{{type}}/{{pascalCase name}}Screen/__tests__/{{pascalCase name}}Screen.test.tsx',
        templateFile: 'plop-templates/screen/Screen.test.tsx.hbs',
      }] : []),
    ],
  });

  // Service generator
  plop.setGenerator('service', {
    description: 'Create a new service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Service name:',
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Create test file?',
        default: true,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/services/{{camelCase name}}/{{pascalCase name}}Service.ts',
        templateFile: 'plop-templates/service/Service.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/services/{{camelCase name}}/{{pascalCase name}}Service.types.ts',
        templateFile: 'plop-templates/service/Service.types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/services/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/service/index.ts.hbs',
      },
      ...(plop.getGenerator('service').answers.withTest ? [{
        type: 'add',
        path: 'src/services/{{camelCase name}}/__tests__/{{pascalCase name}}Service.test.ts',
        templateFile: 'plop-templates/service/Service.test.ts.hbs',
      }] : []),
    ],
  });

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new custom hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name:',
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Create test file?',
        default: true,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/use{{pascalCase name}}.ts',
        templateFile: 'plop-templates/hook/useHook.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/use{{pascalCase name}}.types.ts',
        templateFile: 'plop-templates/hook/useHook.types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/hook/index.ts.hbs',
      },
      ...(plop.getGenerator('hook').answers.withTest ? [{
        type: 'add',
        path: 'src/hooks/{{camelCase name}}/__tests__/use{{pascalCase name}}.test.ts',
        templateFile: 'plop-templates/hook/useHook.test.ts.hbs',
      }] : []),
    ],
  });
};

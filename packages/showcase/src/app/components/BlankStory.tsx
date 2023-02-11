export const BlankStory = () => {
  return (
    <div className="md:m-20 md:rounded-xl md:border md:p-10 md:shadow">
      <p className="mb-6 text-3xl font-semibold">👋 Welcome to Showcase.js</p>
      <p className="text-lg">
        Showcase.js is a React story visualizer and test framework. Using
        Showcase, you can build a storybook-like environment for your React
        components and perform visual regression tests using your own CI.
      </p>
      <p className="mt-5 text-lg">
        To get started, create a story file in your project. For example, if you
        have a component called <code>Button</code> in a file called{" "}
        <code>Button.tsx</code>, create a file called{" "}
        <code>Button.stories.tsx</code> and add a story like this:
      </p>
      <pre className="mt-5 overflow-y-auto rounded bg-gray-100 p-5 text-sm">
        <code>
          {`import { ComponentMeta, ComponentStory } from "@showcasejs/react";
import { Button } from './Button';
 
export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;
 
export const Primary: ComponentStory<typeof Button> = () => <Button>Primary</Button>;
`}
        </code>
      </pre>
      <p className="mt-5 text-lg">
        For more information, check out the{" "}
        <a className="underline" href="https://github.com/yuan-alex/showcase">
          documentation
        </a>
        .
      </p>
    </div>
  );
};

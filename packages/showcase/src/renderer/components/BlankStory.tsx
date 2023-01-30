export const BlankStory = () => {
  return (
    <div className="m-24 w-2/3">
      <p className="mb-5 text-2xl">Welcome to Showcase</p>
      <p className="text-lg">
        Showcase is a{" "}
        <a className="underline" href="https://github.com/ComponentDriven/csf">
          Storybook
        </a>{" "}
        compatible UI component viewer in pre-alpha built for performance and
        bundler interoperability. Currently, Showcase is powered by Vite,
        enabling a fast and performative developer experience.
      </p>
    </div>
  );
};

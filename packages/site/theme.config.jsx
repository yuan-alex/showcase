export default {
  logo: <strong>Showcase</strong>,
  project: {
    link: "https://github.com/yuan-alex/showcase",
  },
  docsRepositoryBase:
    "https://github.com/yuan-alex/showcase/blob/packages/site/pages",
  useNextSeoProps() {
    return {
      titleTemplate: "%s - Showcase",
    };
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="/" target="_blank">
          Alex Yuan
        </a>
        .
      </span>
    ),
  },
};

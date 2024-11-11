# Gyldendal Uddannelse Digital - Frontend task

## Running the project

To run this project, few steps are required.

Firstly, the project has been implemented using the current `Node.JS LTS`, i.e. `Node v22`.

In case you encounter any issues in the following steps, please ensure that you're the project using the latest Node version.

**NB:** As `import.meta.dirname` is used in tooling configuration, then Node versions less than v20.11 _will_ fail.

Then, the next step is to install all dependencies required by the project:

```bash
npm install
```

Afterwards you can either run the actual Next.JS app, or inspect the components using the provided Storybook environment:

```bash
> npm run build
> npm run start

# or

> npm run dev

# or

> npm run storybook
```

And that's it! 💫 Now the project should be running smoothly on your local machine.

## Considerations

This section contains various notes and considertions that I considered during development.

### Tanstack Query

I've implemented the data communication between the NextJS backend and frontend using Tanstack Query.

In the current state of this project it does not add much value, as data is only consumed (and not manipulated) in the root of the two pages.

As such I might as well have had used regular props for data consumption.

For Tanstack Query to have provided real value, then the implementation of the Rating System should have been implemented. I will discuss this further in the final section.

### WCAG

* Components, where relevant, have been implemented using [APGs](https://www.w3.org/WAI/ARIA/apg/) as guidelines.

* States for interactive components have been added, such as hover and focus styles.

* The site has been optimized for all viewports.

### Code Quality

In order to improve the code quality the project uses the following tools:

* Strict Typescript
* ESLint
* Stylelint

### Testing

Various testing strategies have been considered for this project.

* **Unit-tests:** As this is a fairly simply frontend project, without any complicated business logic, then I've opted to *not* add any unit-tests. If they were to be considered, then I'd argue that they should be used for business-logic and utilities. In this case we would simply be testing either the browser or the API.

* **Visual testing:** Instead, I've opted to implement visual testing of the components. This approach may help to ensure that individual components does not change without awareness by either developers or designers.

* **End-to-end tests**: Finally, end-to-end tests could have been implemented using e.g. `Cypress` to tests flows such as navigation. However in the interest of time, and since we have no control over the backend, I've opted to not implement this.

In the future it may also be beneficial to adopt a regression-testing strategy to reduce the risk that bugs, onced fixed, do not surface again.

### Inclusion of utils

I've included various utilities inside the `utils` folder. These utilities have not been written during this test, but they are part of my usual boilerplate.

* **`constants`**: Various shared constants that are used to improve the readability of the code.
* **`css`**: Various utilities used in combination with the CSS-in-JS framework `linaria`. It includes common CSS resets, definitions of breakpoints and easing curves, as well as unit abstractions.
* **`design-tokens`**: Contains various design-tokens extracted from the Figma design such as colors, typographies and more.

These utilities have been included to facilitate usage of best practices (e.g. rem vs. px) and increase the maintainability and scalability of the code.

## Rating system

I did not have time to implement the rating system, but I have the following considerations:

* This could have been implemented in many ways. The simplest would likely have been through `localStorage` or similar.
* If this were to be implemented properly, then a prerequisite would be user management.
* It could have been a better example of why Tanstack Query provides value, as it would allow seamless integration of optimistic updates, retries and more.

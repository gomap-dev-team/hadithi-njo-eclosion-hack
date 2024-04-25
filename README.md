# Hadithi-njo

## Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Tech stack

- [Next.js v14 page directory](https://nextjs.org/docs): development framework
- [Chadcn](https://ui.shadcn.com/): UI library
- [Tailwindcss](https://tailwindcss.com/docs/installation): Styling framework
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction): state management framework

## Contributing

- All the components should be created with `function` keyword

```js
export default function MyComponent() {
  return <div>Hello World!</div>;
}
```

- All the colors should be added in tailwindcss config file if needd
- User `type` for defining TypeScript type as much as possible
- Avoid using contexts as much as possible
- All the commits should follow the convetionsal structure

  - For a feature: feat: my new feature
  - bug fixes: fix: commit message

Note: Follow this link to learn more: [Link](https://www.conventionalcommits.org/en/v1.0.0/)

# design-system

This is the implementation of the design-system made by Graciele Luhm on [Figma](https://www.figma.com/file/U1vYmXOMTFNx05ggSqoGre/Defenser---Folhas-Tech?type=design&node-id=2-7&mode=design&t=irvy6vuePzMkkYSc-0) for Defenser.
It uses [RadixUI](https://www.radix-ui.com/primitives) and [HeadlessUI](https://headlessui.com/) primitives and builds on top of it

---

## Running: 
```bash
npm run stories
```
Opens the storybook page of all the styled components on [http://localhost:6006](http://localhost:6006) or alternatively you can use the [deployed version](https://folhastech-design-system.vercel.app)

---
## Using:

As of now, this package is private, so to use it you will need an .npmrc file 

```npmrc
//npm.pkg.github.com/:_authToken=${PAT}
@folhastech:registry=https://npm.pkg.github.com/
```

Where ${PAT} is your Personal Access Token that can be created [here](https://github.com/settings/tokens)
(do not put high permissions in this token, only `read:packages` is enough)

You can also login with your Github account too:

Run:
```bash
npm login --scope=@folhastech --auth-type=legacy --registry=https://npm.pkg.github.com
```

It will prompt your github username and a your token, witch you can generate [here](https://github.com/settings/tokens) 

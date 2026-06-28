// Fontsource packages ship CSS only (no type declarations). They're imported
// for their side effect of registering @font-face rules. TypeScript 6.0 errors
// on untyped side-effect imports (TS2882), so declare them as ambient modules.
declare module "@fontsource-variable/*";

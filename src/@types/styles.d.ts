import "styled-components";
import { defaultTheme } from "../styles/themes/default";

// by passing your mouse above { defaultTheme } u can see that typescript creates a default typing for it;
// there is a way for u to acess this and store it inside an variable

type ThemeType = typeof defaultTheme;
// now it has the auto types from defaultTheme inside this type.

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

/* ---

- We're importing styled-components

- We are declaring a module, thats it, we are creating a type for that module. But, once we are importing it (and not creating it), we will actually be adding something to it.

- export interface DefaultTheme {} is something that is located inside configs of styled-component module, by redeclaring it that way, we are telling styled-component to "implement" our created-type to it (extends will "merge" it).

--- */

// this all will fit for we to have a more intelligent suggestions at everywhere we use this theme (by pressing ctrl + spacebar), for instance: `background-color: ${props => props.theme.(SUGGESTIONS WE'VE CREATED WILL APPEARS AT THIS POINT)};`

import { Button } from "./button";
import { Input } from "./input";
import { SearchInput } from "./search-input";

export * from './button';
export * from './component';
export * from './input';
export * from './search-input';

export class WebComponents {
    static registerAll() {
        Button.register();
        Input.register();
        SearchInput.register();
    }
}
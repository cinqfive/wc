import { Button } from './button';
import { Caroussel } from './caroussel';
import { Input } from './input';
import { SearchInput } from './search-input';

export * from './button';
export * from './component';
export * from './input';
export * from './search-input';
export * from './list';
export * from './list-item';
export * from './disposable-panel';
export * from './dialog';

export class WebComponents {
  static registerAll() {
    Button.register();
    Input.register();
    SearchInput.register();
    Caroussel.register();
  }
}

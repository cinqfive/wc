import { Button } from './button';
import { Caroussel } from './caroussel';
import { CreateButton } from './create-button';
import { Form } from './form';
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
export * from './create-button';
export * from './menu';
export * from './markdown-editor';
export * from './form';

export class WebComponents {
  static registerAll() {
    Button.register();
    Input.register();
    SearchInput.register();
    Caroussel.register();
    CreateButton.register();
    Form.register();
  }
}

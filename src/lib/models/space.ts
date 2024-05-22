import { LucideIcon } from 'lucide-react';

// Space model
export interface Space {
  id: string;
  icon?: string;
  name: string;
  vaults: (Vault<AddressElement> | Vault<SocialElement>)[];
}

// Vaults
export interface Vault<T extends VaultElement> {
  id: string;
  type: VaultType;
  elements: T[];
}

export interface VaultType {
  id: string;
  label: string;
  icon: LucideIcon;
}

// Elements
export interface VaultElement {
  id: string;
  entity: Entity;
  tags: Tag[];
}

export interface AddressElement extends VaultElement {
  address: string;
  name?: string;
  alias?: string;
  notes?: string;
}

export interface SocialElement extends VaultElement {
  url: string;
  username: string;
}

// Entity
export interface Entity {
  color: string;
  icon: string;
  value: string;
  validationRegex: RegExp;
  defaultTags: Tag[];
}

// Tags
export interface TagCategory {
  icon: string;
  label: string;
}

export interface Tag {
  icon: string;
  label: string;
  category: TagCategory;
}

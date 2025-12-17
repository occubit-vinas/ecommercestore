import { Category } from "@/types/global.types";

export function findCategoryById(
  input: Category | Category[],
  targetId: string
): Category | null {
  const categories = Array.isArray(input) ? input : [input];

  for (const category of categories) {

    if (String(category.id) === String(targetId)) {
      return category;
    }

    if (Array.isArray(category.children) && category.children.length > 0) {
      const found = findCategoryById(category.children, targetId);
      if (found) return found;
    }
  }

  return null;
}


export function flattenCategories(
  input: Category | Category[]
): Category[] {
  const categories = Array.isArray(input) ? input : [input];

  return categories.flatMap((category) => [
    category,
    ...(category.children
      ? flattenCategories(category.children)
      : []),
  ]);
}

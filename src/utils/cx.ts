/** Joins truthy class names with a space. `cx('a', cond && 'b', '')` → `'a b'` or `'a'`. */
export default function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

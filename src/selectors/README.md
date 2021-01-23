# Selectors

A selector is a small function you write that can take the entire data, and pick out or transform values from it. We can also call it a modifier function.

This can also be very helpful for unit testing.

## Example

```js
// Fetched data from the server
const responseData = [
  {
    name: 'Juan Dela Cruz',
    username: 'jCruz',
    birth_date: '2000-12-12',
    country: 'Philippines',
  },
  {
    name: 'Jane Doe',
    username: 'jDoe',
    birth_date: '2005-11-11',
    country: 'USA',
  },
];

// user.selector.ts
export const getDisplayName = (data: IUser[]): string[] =>
  data.map((value) => `${value.name} (${value.username})`);

console.log(getDisplayName(responseData));
/* 
[
    "Juan Dela Cruz (jCruz)",
    "Jane Doe (jDoe)"
]
*/
```

Now we can reuse the **getFullname** function anywhere on the app.

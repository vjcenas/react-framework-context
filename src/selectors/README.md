# Selectors

A selector is a small function you write that can take the entire data, and pick out or transform values from it. We can also call it a modifier function.

This can also be very helpful for unit testing.

## Example
```js
// Fetched data from the server
const responseData = [
    {
        first_name: "Juan",
        last_name: "Dela Cruz",
        birth_date: "2000-12-12",
        country: "Philippines"
    },
    {
        first_name: "Jane",
        last_name: "Doe",
        birth_date: "2005-11-11",
        country: "USA"
    }
]

// user.selector.ts
const getFullnames = (data) => {
    return data.map((value) => {
        return `${value.first_name} ${value.last_name}`;
    });
}


console.log(getFullnames(responseData))
/* 
[
    "Juan Dela Cruz",
    "Jane Doe"
]
*/
```

Now we can reuse  the **getFullname** function anywhere on the app.
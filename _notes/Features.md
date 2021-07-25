- ## Syntax Highlighting (with Prism)

```javascript
import React from "react"
import Header from "./header"

  return (
    <>
      <Header title={title} />
      <main role="main" className="container mt-3">
        {children}
      </main>
    </>
  )
}
```

- ## Mermaid graphs and diagrams

**Markdown input:**

<pre>
```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

</pre>

**Output**:

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

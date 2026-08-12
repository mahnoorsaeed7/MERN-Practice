# OOP Complete Revision Notes
### Built alongside The Star Stream Engine — 10 Days, 9 Core Concepts

This file is for later revision. Every concept has: a plain-English definition, why it exists (the problem it solves), a small standalone example (not ORV — deliberately generic so it's fast to re-read), and the pitfalls that actually get asked in viva.

---

## 1. Structures vs. Classes

**What it is:** In C++, `struct` and `class` are almost identical — both bundle data and functions together. The *only* technical difference is default access: `struct` members are `public` by default, `class` members are `private` by default.

**Why it matters:** A `struct` communicates "this is mostly just data" (like a coordinate pair). A `class` communicates "this has internal rules and hidden state" — signaling intent, even before you write a single access modifier.

```cpp
struct Point {       // public by default
    int x, y;
};

class Account {      // private by default
    double balance;  // hidden unless you write `public:`
};
```

**Viva trap:** "Struct and class are the same in C++" is *almost* true — the honest answer is "identical except for default access and default inheritance type," not "identical."

---

## 2. Encapsulation

**What it is:** Bundling data with the functions that operate on it, and hiding the data behind a controlled interface (`private` + public getters/setters), so outside code can never put the object into an invalid state directly.

**Why it matters:** Without encapsulation, anyone can write `account.balance = -500;`. With it, every change is forced through a function you control — so you can validate, log, or reject bad input.

```cpp
class Account {
private:
    double balance;
public:
    void deposit(double amount) {
        if (amount <= 0) { return; }   // guard — invalid state rejected
        balance += amount;
    }
    double getBalance() const { return balance; }
};
```

**Access modifiers, all three:**
| Modifier | Visible to |
|---|---|
| `public` | Anyone |
| `protected` | The class itself + derived classes |
| `private` | The class itself only |

**Viva trap:** Encapsulation is not "just making things private." Making everything private with no getters/setters just makes the class useless. The point is *controlled* access, not *no* access.

---

## 3. Constructors

**What it is:** A special function, same name as the class, no return type, that runs automatically the moment an object is created. Its job: get the object into a valid starting state.

```cpp
class Player {
    int health;
public:
    Player() { health = 100; }                 // default constructor
    Player(int h) { health = h; }               // parameterized constructor
};
```

**`this` keyword:** inside any member function, `this` is a pointer to the object the function was called on. You need it mainly when a parameter name shadows a member name:

```cpp
void setHealth(int health) {
    this->health = health;   // this->health = the member, health = the parameter
}
```

**Member initializer list (a gap in this course — see Section 10):** the *proper* place to initialize members, especially `const` members and reference members, is not the constructor *body* — it's the initializer list:

```cpp
class Player {
    const int maxHealth;
public:
    Player(int m) : maxHealth(m) { }   // REQUIRED for const members — can't assign in the body
};
```
This course's `Incarnation::time_line` sidesteps this using an **in-class default member initializer** (`const int time_line = 1864;` written directly at the declaration) — a C++11 shortcut. It works, but if a const member needed a *different* value per object (not the same for every instance), an initializer list would be unavoidable.

**Constructor overloading:** having multiple constructors with different parameter lists (default + parameterized above) is just function overloading applied to constructors — same rules (must differ in number/type of parameters).

**Default arguments:** `Incarnation(string name, int health, int level, int stigmaStart, int inventoryCapacity = 3)` — if the caller omits the last argument, `3` is used. This is a lightweight alternative to writing a second overload.

**Viva trap:** "Why can't I initialize a const member inside the constructor body?" — because by the time the body runs, the object already exists and its const members are already "locked." Initializer lists run *during* construction, before the body.

---

## 4. Copy Constructor, Shallow vs. Deep Copy, Destructor

**Copy constructor:** runs when a new object is created *from* an existing one — `Incarnation clone = original;`. If you never write one, the compiler generates a default copy constructor that copies every member **field by field**.

**Shallow copy — the danger:** if a member is a raw pointer (like `int* stigmaPower`), the compiler's default copy just copies the *address*. Now two objects point at the same heap memory. Changing one changes the other. Worse: when both objects are destroyed, both destructors call `delete` on the *same* address — a double free, which is undefined behavior (often a crash).

**Deep copy — the fix:** manually allocate new memory and copy the *value*, not the address:

```cpp
class Bag {
    int* data;
public:
    Bag(int val) { data = new int(val); }

    // Deep copy constructor
    Bag(const Bag &other) {
        data = new int(*other.data);   // NEW memory, value copied in
    }

    ~Bag() { delete data; }
};
```

**Destructor:** runs automatically when an object goes out of scope, always in *reverse* order of construction. Its job is cleanup — releasing whatever the constructor acquired (usually heap memory via `new`).

**The gap this course has (important — see Section 10):** a copy constructor handles `Bag b2 = b1;` (copy *during creation*). It does **not** handle `b2 = b1;` (assignment *after* both already exist) — that's a different function, the **copy assignment operator**, which this course never wrote. Right now, `Incarnation a = b;` is safe (deep copy), but `a = b;` on two already-existing `Incarnation` objects would silently shallow-copy and eventually double-free. This is the single most important gap to close next — see the Rule of Three in Section 10.

**Viva trap:** "What's the difference between a copy constructor and the assignment operator?" — one initializes a brand-new object from an existing one; the other replaces the contents of an object that already exists. They are two different functions, and writing one does **not** give you the other for free.

---

## 5. Static Members

**What it is:** A member (variable or function) that belongs to the *class itself*, not to any individual object. There's exactly one copy, shared by every instance.

```cpp
class Player {
    static int totalPlayers;   // declared inside the class
public:
    Player() { totalPlayers++; }
    static int getTotalPlayers() { return totalPlayers; }
};
int Player::totalPlayers = 0;   // defined ONCE, outside the class — required
```

**Two ways to call a static function** — both reach the same shared value:
```cpp
Player::getTotalPlayers();   // through the class name — no object needed
somePlayerObject.getTotalPlayers();   // through an object — still legal, still shared
```

**Why the out-of-class definition is required:** the `static int totalPlayers;` line inside the class only *declares* that it exists — it doesn't allocate storage. `int Player::totalPlayers = 0;` at file scope is where the memory actually gets created. Miss this line and you'll get a linker error.

**Static member functions cannot:** access `this`, or touch any non-static member — because a static function might be called with zero objects in existence at all.

**Viva trap:** "Is a static member part of the object?" — no. `sizeof(Player)` does **not** grow because of a static member; it lives in one shared location, not inside each object's memory layout.

---

## 6. Pointers & Aggregation

**Pointer recap:** a pointer holds a memory address. `int* p = new int(5);` allocates an `int` on the heap and `p` stores where it lives. `*p` dereferences — "the value at that address." `new` without a matching `delete` leaks memory; `delete`ing twice is undefined behavior.

**Dynamic arrays:** `Item* inventory = new Item[capacity];` allocates a whole array on the heap. Must be released with `delete[]` (bracket form) — using plain `delete` on an array is also undefined behavior.

**Aggregation ("has-a," independent lifetime):** one class holds a pointer/reference to another, but the *held* object's lifetime isn't strictly tied to the *holder's*. Contrast with **composition** ("has-a," tied lifetime — the held object is created and destroyed *with* the owner, typically as a direct member, not a pointer).

```cpp
class Engine { /* ... */ };

class Car {
    Engine* engine;   // aggregation — Car holds a pointer to an Engine
public:
    Car(Engine* e) { engine = e; }   // Car doesn't own/create the Engine
};
```
This course's `Incarnation` holding `Item* inventory` (allocated and freed *by* `Incarnation` itself, in its own constructor/destructor) leans closer to **composition** in practice, even though it's implemented with a pointer — worth being able to explain the distinction rather than just naming it.

**Viva trap:** "Is a pointer member always aggregation?" — no. What decides aggregation vs. composition is *who controls the lifetime*, not whether a pointer is involved.

---

## 7. Inheritance

**What it is:** A new class (**derived**) reuses the members of an existing class (**base**), and adds or overrides its own.

```cpp
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    void eat() { cout << name << " is eating." << endl; }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}   // must explicitly call the base constructor
    void bark() { cout << name << " says woof!" << endl; }
};
```

**Why the base constructor call is explicit:** a derived object *contains* a base sub-object inside it. That sub-object must be fully constructed before the derived constructor body runs — C++ never guesses which base constructor you meant, so you name it in the initializer list (`: Animal(n)`).

**Access + inheritance type combine:** `protected` members (like `name` above) are invisible to outside code but visible to `Dog` — that's the whole reason `protected` exists instead of just `private`/`public`.

**Types of inheritance** (this course only used single/hierarchical — the rest are a gap, see Section 10): single, multilevel (`C : B`, `B : A`), hierarchical (multiple classes from one base — exactly what `Scenario` → 4 children is), multiple (`class C : public A, public B`), and hybrid (a mix). Multiple inheritance introduces the **diamond problem** — not covered yet.

**Viva trap:** "Does a derived class inherit private members?" — technically they exist in memory as part of the object, but the derived class has **no direct access** to them — only through the base class's own public/protected interface.

---

## 8. Polymorphism

**What it is:** the same function call behaving differently depending on the actual (runtime) type of the object, when accessed through a base class pointer/reference.

**Two kinds — this course covers only one:**
- **Runtime polymorphism** (covered): virtual functions, resolved at *runtime* based on actual object type.
- **Compile-time polymorphism** (gap — see Section 10): function overloading and operator overloading, resolved at *compile* time based on argument types.

```cpp
class Shape {
public:
    virtual double area() = 0;   // pure virtual — makes Shape abstract
    virtual ~Shape() {}          // virtual destructor — required, see below
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override { return 3.14159 * radius * radius; }
};

Shape* s = new Circle(5);
s->area();     // calls Circle's version — resolved at runtime, not compile time
delete s;      // needs Shape's destructor to be virtual, or Circle's part leaks
```

**Pure virtual function (`= 0`):** has no body in the base class and makes the whole class **abstract** — you cannot create a `Shape` object directly, only derived, fully-overridden types.

**Why the virtual destructor matters — concretely:** if `~Shape()` is *not* virtual and you `delete` a `Circle*` through a `Shape*`, only `~Shape()` runs. Any cleanup `~Circle()` was supposed to do (freeing its own heap memory, say) never happens — a real, silent memory leak. It only manifests when deletion actually happens through a base pointer — which is exactly why this bug is easy to miss in testing.

**Viva trap:** "What's the difference between overloading and overriding?" — overloading is same name, different parameters, resolved at compile time, no inheritance required. Overriding is same signature, in a derived class, resolved at runtime, requires `virtual`.

---

## 9. Friend Functions / Friend Classes

**What it is:** a `friend` declaration inside a class grants one specific outside function or class direct access to its `private`/`protected` members — bypassing getters/setters entirely, for that one friend only.

```cpp
class Wallet {
private:
    double balance;
    friend class Auditor;   // ONLY Auditor gets special access
public:
    Wallet(double b) : balance(b) {}
};

class Auditor {
public:
    void inspect(const Wallet &w) {
        cout << w.balance << endl;   // direct access — no getter needed
    }
};
```

**Order matters:** `Auditor` must be declared/defined *after* `Wallet`'s closing `};` if `Wallet` only forward-declares it with `friend class Auditor;`.

**Friendship is not mutual, and not inherited:** `Wallet` granting friendship to `Auditor` gives `Auditor` nothing back — `Wallet` still can't touch `Auditor`'s privates unless `Auditor` separately grants it. And if `Auditor` were later inherited by `SubAuditor`, `SubAuditor` would **not** automatically inherit the friendship.

**The const-pointer gap this exposes (important, viva-favorite):** a `const Type&` parameter only locks the top-level members. If one of those members is a raw pointer, the pointer itself becomes read-only, but the thing it *points to* stays fully mutable through that pointer:
```cpp
void inspect(const Wallet &w) {
    // w.balance = 5;        // ERROR — balance is const here
    *(w.someIntPointer) = 5; // COMPILES — const doesn't reach through the pointer
}
```

**Viva trap:** "Isn't `friend` a violation of encapsulation?" — a fair critique, and the honest answer: it's a deliberate, narrow, named exception to encapsulation, not a bypass of it. Encapsulation still blocks *everyone else*.

---

## 10. Concepts Still Needed (Real Gaps From This Build)

These weren't covered across the 10 Days but are standard HEC/NCEAC OOP material, and a few were exposed as *actual latent issues* in the code you just finished — worth closing before a viva, not just filed away.

**Copy Assignment Operator + Rule of Three (highest priority):**
`Incarnation` has a destructor and a copy constructor, but no `operator=`. Right now `a = b;` (assignment between two already-existing objects) uses the compiler's default shallow assignment — a double-free waiting to happen. The **Rule of Three**: if you need to write *any one* of destructor / copy constructor / copy assignment operator, you almost always need all three.
```cpp
Incarnation& operator=(const Incarnation &other) {
    if (this == &other) return *this;   // guard against self-assignment
    delete stigmaPower; delete[] inventory;   // release old resources first
    // ... then deep-copy, same as the copy constructor
    return *this;
}
```

**Operator Overloading (general):** giving operators like `+`, `==`, `<<` custom meaning for your own classes. `operator=` above is one specific case of this broader topic.

**Uninitialized members after failed validation (a bug you found today):** the parameterized `Incarnation` constructor calls `setHealth(500)` directly on a member that was never given a safe value first. If validation rejects it, "keeping previous value" actually means "keeping whatever garbage was already in that memory" — undefined behavior. The fix pattern: assign a known-safe default *before* calling the validated setter, the same way the default constructor already does.

**Exception Handling (`try` / `catch` / `throw`):** a structured way to signal and handle invalid states, instead of `cout << "Warning..."` and silently keeping old values.

**Templates / Generic Programming:** writing one class or function that works across multiple types, e.g. `template<typename T> class Box { T value; };` — avoids writing near-duplicate classes.

**File I/O (`<fstream>`):** `ifstream`/`ofstream` for reading/writing files — useful for persisting something like the Star Stream's coin ledger between runs.

**Multiple / Hybrid Inheritance + the Diamond Problem:** what happens when a class inherits from two bases that share a common ancestor, and how `virtual` inheritance resolves the resulting ambiguity.

**Smart Pointers (`unique_ptr`, `shared_ptr`, `<memory>`):** the modern C++ alternative to raw `new`/`delete`. They make the deep-copy / destructor / Rule-of-Three problems above largely automatic — worth learning right after Rule of Three clicks, to see what problem they're actually solving.

**STL Basics (`vector`, `map`, etc.):** `Incarnation`'s hand-rolled dynamic array (`Item* inventory` + manual capacity tracking) is exactly the problem `std::vector` exists to solve.

---

## Quick Reference Cheat Sheet

| Concept | One-line definition | Key syntax |
|---|---|---|
| Struct vs Class | Same thing, different default access | `struct` = public default, `class` = private default |
| Encapsulation | Hide data, expose controlled access | `private:` + getters/setters |
| Constructor | Runs on object creation | `ClassName(params) { }` |
| `this` | Pointer to the current object | `this->member = param;` |
| Copy Constructor | Builds a new object from an existing one | `ClassName(const ClassName &other)` |
| Deep Copy | New memory, value copied | `new int(*other.ptr)` |
| Destructor | Runs on object destruction, reverse order | `~ClassName() { delete ptr; }` |
| Static Member | One copy, shared by the whole class | `static int x;` + out-of-class definition |
| Aggregation | Has-a, independent lifetime | Pointer/reference member |
| Inheritance | Reuse + extend a base class | `class Derived : public Base` |
| Polymorphism | Runtime-resolved behavior via base pointer | `virtual`, `override`, `= 0` |
| Virtual Destructor | Ensures full derived cleanup via base pointer | `virtual ~Base() { }` |
| Friend | Named exception to encapsulation | `friend class X;` / `friend void f();` |
| Scope Resolution `::` | Reach something belonging to a class/namespace | `ClassName::staticMember` |
| Arrow `->` | Access a member through a pointer | `ptr->member` |
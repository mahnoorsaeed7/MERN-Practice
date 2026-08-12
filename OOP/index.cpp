/* ============================================================
   THE STAR STREAM ENGINE
   A 10-Day OOP build, styled after Omniscient Reader's Viewpoint

   Day 1  - Structures vs. Classes      : Incarnation defined as a class
   Day 2  - Encapsulation               : private stats, validated setters/getters
   Day 3  - Constructors                : default + parameterized, `this` keyword
   Day 4  - Copy Ctor / Destructor      : deep copy of heap-allocated stigmaPower
   Day 5  - Static Members              : totalCoins, shared Star Stream ledger
   Day 6  - Pointers & Aggregation      : Item/Inventory held by each Incarnation
   Day 7  - Inheritance                 : Scenario -> Main/Hidden/SideQuest/Bounty
   Day 8  - Polymorphism                : virtual announceScenario(), base pointers
   Day 9  - Friend Functions            : StarStream reads Incarnation's privates
   Day 10 - Integration                 : every piece running as one program
   ============================================================ */

#include <iostream>
#include <string>
using namespace std;

// ---- small formatting helper, used only for terminal readability ----
void printSectionHeader(const string &title) {
    cout << "\n============================================================\n";
    cout << "  " << title << "\n";
    cout << "============================================================\n";
}

void printDivider() {
    cout << "------------------------------------------------------------\n";
}

// ============================================================
// Item — a piece of equipment an Incarnation can carry (Day 6)
// ============================================================
class Item {
public:
    string itemName;
    int itemPowerRating;

    Item() {
        itemName = "No Item";
        itemPowerRating = 0;
    }

    Item(string name, int power) {
        itemName = name;
        itemPowerRating = power;
    }
};

// ============================================================
// Incarnation — the core character class (Days 1-6, 9)
// ============================================================
class Incarnation {
private:
    // ---- Day 2: Encapsulation — all state is private ----
    string name;
    int health;
    int level;
    const int time_line = 1864;   // same value for every Incarnation
    int* stigmaPower;              // Day 4: heap-allocated, so copy/destroy need custom logic

    // ---- Day 5: Static Members ----
    static int totalCoins;         // ONE shared ledger for the whole class

    // ---- Day 6: Pointers & Aggregation ----
    Item* inventory;
    int itemCount;
    int inventoryCapacity;

public:
    // ================= Day 3: Constructors =================
    Incarnation() {
        this->setName("No Name");
        this->setHealth(5);
        this->setLevel(1);
        stigmaPower = new int;
        *stigmaPower = 0;
        inventoryCapacity = 3;
        inventory = new Item[inventoryCapacity];
        itemCount = 0;
    }

    Incarnation(string name, int health, int level, int stigmaStart, int inventoryCapacity = 3) {
        this->setName(name);
        this->setHealth(health);
        this->setLevel(level);
        this->stigmaPower = new int;
        *stigmaPower = stigmaStart;
        this->inventoryCapacity = inventoryCapacity;
        inventory = new Item[inventoryCapacity];
        itemCount = 0;
    }

    // ================= Day 4: Copy Constructor (deep copy) =================
    Incarnation(const Incarnation &character) {
        this->name = character.name;
        this->health = character.health;
        this->level = character.level;
        this->stigmaPower = new int;
        *stigmaPower = *(character.stigmaPower);
        this->inventoryCapacity = character.inventoryCapacity;
        this->itemCount = character.itemCount;
        this->inventory = new Item[inventoryCapacity];
        for (int i = 0; i < itemCount; i++) {
            this->inventory[i] = character.inventory[i];
        }
    }

    // ================= Day 4: Destructor =================
    ~Incarnation() {
        cout << "Destructor called for " << name << " | Regression End" << endl;
        delete stigmaPower;
        delete[] inventory;
    }

    // ================= Day 2: Setters (validated) =================
    void setName(string n) {
        if (n.empty()) {
            cout << "Warning: name cannot be empty. Keeping previous value." << endl;
            return;
        }
        name = n;
    }

    void setHealth(int h) {
        if (h < 0 || h > 100) {
            cout << "Warning: health out of range. Keeping previous value." << endl;
            return;
        }
        health = h;
    }

    void setLevel(int l) {
        if (l < 1 || l > 99) {
            cout << "Warning: level out of range. Keeping previous value." << endl;
            return;
        }
        level = l;
    }

    // ================= Day 2: Getters =================
    string getName() const     { return name; }
    int getHealth() const      { return health; }
    int getLevel() const       { return level; }
    int getTimeLine() const    { return time_line; }
    int getStigmaPower() const { return *stigmaPower; }

    // ================= Day 5: Static Member Functions =================
    static void donateCoins(int amount) { totalCoins += amount; }
    static int  getTotalCoins()         { return totalCoins; }

    // ================= Day 6: Inventory =================
    bool addItem(Item newItem) {
        if (itemCount >= inventoryCapacity) {
            cout << "Inventory is full. Cannot add item." << endl;
            return false;
        }
        inventory[itemCount] = newItem;
        itemCount++;
        return true;
    }

    void displayInventory() {
        cout << "Incarnation: " << getName() << endl;
        if (itemCount == 0) {
            cout << "  Inventory is empty." << endl;
            return;
        }
        for (int i = 0; i < itemCount; i++) {
            cout << "  Item " << i + 1 << ": " << inventory[i].itemName
                 << ", Power Rating: " << inventory[i].itemPowerRating << endl;
        }
    }

    // ================= Utility =================
    void boostStigmaPower(int value) { *stigmaPower += value; }

    void display_info() {
        cout << "Name: "           << getName()
             << "\nHealth: "       << getHealth()
             << "\nLevel: "        << getLevel()
             << "\nTimeline: "     << getTimeLine()
             << "\nStigma Power: " << getStigmaPower() << endl;
    }

    // ================= Day 9: Friend Class =================
    friend class StarStream;
};

int Incarnation::totalCoins = 0;

// ============================================================
// StarStream — privileged reader of Incarnation's private stats (Day 9)
// ============================================================
class StarStream {
public:
    // Direct access to health/level/stigmaPower here — bypasses getters
    // entirely because StarStream is a `friend` of Incarnation.
    //
    // Note: `character` is a const reference, yet *(character.stigmaPower)
    // still compiles. const on an object only makes its members
    // top-level const; stigmaPower is `int* const` here, not `const int*`,
    // so the const-ness never reaches the int it points to.
    int starStreamScore(const Incarnation &character) {
        return (character.health * 2) + (character.level * 10) + (*(character.stigmaPower) * 5);
    }

    void broadcastAndReward(Incarnation &character) {
        cout << "[Bihyung] Broadcasting " << character.name << "'s performance!" << endl;
        int score = starStreamScore(character);
        cout << character.name << "'s Score!  " << score << endl;
        Incarnation::donateCoins(score);
    }
};

// ============================================================
// Scenario — abstract base class (Days 7-8)
// ============================================================
class Scenario {
protected:
    string scenarioName;
    int scenarioNumber;
    string penalty;
    int coinReward;
    int timeLimit;

public:
    Scenario() {}

    Scenario(string scenarioName, string penalty, int reward, int timeLimit, int scenarioNumber) {
        this->setScenarioName(scenarioName);
        this->setScenarioNumber(scenarioNumber);
        this->setPenalty(penalty);
        this->setCoinReward(reward);
        this->setTimeLimit(timeLimit);

        cout << "[Bihyung] Opening broadcast channel for: " << scenarioName << endl;
        cout << "Scenario Number: " << scenarioNumber << endl;
    }

    // virtual: this Scenario hierarchy is used through base-class pointers
    // (see activeScenario[] in main), so derived destructors must run too.
    virtual ~Scenario() {
        cout << "[Bihyung] Closing broadcast channel for: " << scenarioName << endl;
    }

    void displayScenarioInfo() {
        cout << "Scenario: "     << getScenarioName() << endl;
        cout << "Number: "       << getScenarioNumber() << endl;
        cout << "Penalty: "      << getPenalty() << endl;
        cout << "Coin Reward: "  << getCoinReward() << endl;
        cout << "Time Limit: "   << getTimeLimit() << " Hours" << endl;
    }

    void setScenarioName(string n) {
        if (n.empty()) {
            cout << "Warning: Scenario name cannot be empty. Keeping previous value." << endl;
            return;
        }
        scenarioName = n;
    }

    void setPenalty(string p) {
        if (p.empty()) {
            penalty = " \u25A0 \u25A0 \u25A0 ";
            return;
        }
        penalty = p;
    }

    void setCoinReward(int r) {
        if (r < 0) {
            cout << "Warning: Coin reward cannot be negative. Keeping previous value." << endl;
            return;
        }
        coinReward = r;
    }

    void setTimeLimit(int t) {
        if (t <= 0) {
            cout << "Warning: Time limit cannot be zero or negative. Keeping previous value." << endl;
            return;
        }
        timeLimit = t;
    }

    void setScenarioNumber(int n) {
        if (n <= 0) {
            cout << "Warning: Scenario number cannot be zero or negative. Keeping previous value." << endl;
            return;
        }
        scenarioNumber = n;
    }

    string getScenarioName() const   { return scenarioName; }
    int getScenarioNumber() const    { return scenarioNumber; }
    string getPenalty() const        { return penalty; }
    int getCoinReward() const        { return coinReward; }
    int getTimeLimit() const         { return timeLimit; }

    // Day 8: pure virtual — makes Scenario abstract, forces every derived
    // class to supply its own version.
    virtual void announceScenario() = 0;

    // Resolves THIS scenario: announce it (polymorphic call), then pay its
    // reward into Incarnation's shared static ledger.
    void resolveScenario() {
        this->announceScenario();
        Incarnation::donateCoins(this->getCoinReward());
    }
};

// ============================================================
// Scenario subtypes (Day 7: Inheritance, Day 8: Polymorphism)
// ============================================================
class MainScenario : public Scenario {
private:
    int chapter;
public:
    MainScenario(string name, string penalty, int reward, int timeLimit, int scenarioNumber, int chapter)
        : Scenario(name, penalty, reward, timeLimit, scenarioNumber) {
        this->chapter = chapter;
    }

    void announceScenario() {
        cout << "[ Main Scenario # " << chapter << " ]" << endl;
        displayScenarioInfo();
    }
};

class HiddenScenario : public Scenario {
private:
    string hiddenScenarioObjective;
    string unlockedCondition;
    static int hiddenScenarioCount;
public:
    HiddenScenario(string name, string penalty, int reward, int timeLimit, int scenarioNumber,
                   string hiddenScenarioObjective, string unlockedCondition)
        : Scenario(name, penalty, reward, timeLimit, scenarioNumber) {
        this->hiddenScenarioObjective = hiddenScenarioObjective;
        this->unlockedCondition = unlockedCondition;
        hiddenScenarioCount++;
    }

    void announceScenario() {
        cout << "[ Hidden Scenario # " << getHiddenScenarioObjective() << " ]" << endl;
        cout << "Unlocked Condition: "   << getUnlockedCondition() << endl;
        cout << "Hidden Scenario Count: "<< getHiddenScenarioCount() << endl;
        displayScenarioInfo();
    }

    string getHiddenScenarioObjective() const { return hiddenScenarioObjective; }
    string getUnlockedCondition() const       { return unlockedCondition; }
    int getHiddenScenarioCount() const        { return hiddenScenarioCount; }
};
int HiddenScenario::hiddenScenarioCount = 0;

class SideQuest : public Scenario {
private:
    string sideQuestObjective;
    bool isOptional;
public:
    SideQuest(string name, string penalty, int reward, int timeLimit, int scenarioNumber,
              string sideQuestObjective, bool isOptional)
        : Scenario(name, penalty, reward, timeLimit, scenarioNumber) {
        this->sideQuestObjective = sideQuestObjective;
        this->isOptional = isOptional;
    }

    void announceScenario() {
        cout << "[ Side Quest # " << getSideQuestObjective() << " ]" << endl;
        cout << "Is Optional: " << (isOptional ? "Yes" : "No") << endl;
        displayScenarioInfo();
    }

    string getSideQuestObjective() const { return sideQuestObjective; }
};

class BountyScenario : public Scenario {
private:
    string bountyTarget;
public:
    BountyScenario(string name, string penalty, int reward, int timeLimit, int scenarioNumber, string bountyTarget)
        : Scenario(name, penalty, reward, timeLimit, scenarioNumber) {
        this->bountyTarget = bountyTarget;
    }

    void announceScenario() {
        cout << "[ Bounty Scenario # " << getBountyTarget() << " ]" << endl;
        displayScenarioInfo();
    }

    string getBountyTarget() const { return bountyTarget; }
};

// ============================================================
// main — the whole Star Stream Engine, running end to end
// ============================================================
int main() {

    // ---------------- Sponsor Selection: Incarnation construction ----------------
    printSectionHeader("SPONSOR SELECTION - INCARNATION CONSTRUCTION");
    Incarnation yoo_jh("yoo joonghyuk", 99, 49, 5);
    yoo_jh.display_info();
    printDivider();
    Incarnation dokja("dokja", 96, 51, 10);
    dokja.display_info();

    // ---------------- Scenario broadcasts open ----------------
    printSectionHeader("BROADCAST CHANNELS OPENING - SCENARIO LINEUP");
    MainScenario   mainScenario  ("Main Scenario",  "Elimination from Main Scenario",     1000, 60, 1, 1);
    HiddenScenario hiddenScenario("Hidden Scenario","Death",                               500, 30, 2,
                                   "Find the hidden key", "Defeat the boss");
    SideQuest      sideQuest     ("Side Quest",     "Death",                               300, 20, 3,
                                   "Rescue the captive", false);
    BountyScenario bountyScenario("Bounty Scenario","No participation in next Scenario",   800, 40, 4,
                                   "Eliminate the rogue agent");

    // ---------------- Polymorphic resolution ----------------
    printSectionHeader("CYCLING TODAY'S ACTIVE BROADCAST LINEUP");
    Scenario *activeScenario[4];
    activeScenario[0] = &mainScenario;
    activeScenario[1] = &hiddenScenario;
    activeScenario[2] = &bountyScenario;
    activeScenario[3] = &sideQuest;

    for (int i = 0; i < 4; i++) {
        activeScenario[i]->resolveScenario();
        printDivider();
    }

    // ---------------- Star Stream broadcasts (friend access) ----------------
    printSectionHeader("STAR STREAM - LIVE PERFORMANCE BROADCAST");
    StarStream starStream;
    starStream.broadcastAndReward(yoo_jh);
    starStream.broadcastAndReward(dokja);
    cout << "[Bihyung] Total coins now circulating: " << Incarnation::getTotalCoins() << endl;

    // ---------------- Direct coin donations (static via object syntax) ----------------
    printSectionHeader("DIRECT COIN DONATIONS");
    yoo_jh.donateCoins(500);
    dokja.donateCoins(300);
    // donateCoins() is static — calling it through an object still updates
    // the ONE shared ledger, same as calling Incarnation::donateCoins().
    cout << "Total Coins (All, via Incarnation::)   : " << Incarnation::getTotalCoins() << endl;
    cout << "Total Coins (All, via yoo_jh object)    : " << yoo_jh.getTotalCoins() << endl;
    cout << "Total Coins (All, via dokja object)     : " << dokja.getTotalCoins() << endl;

    // ---------------- Copy constructor + deep copy proof ----------------
    printSectionHeader("REGRESSION TEST - COPY CONSTRUCTOR (DEEP COPY)");
    Incarnation secretive_plotter = yoo_jh;   // deep copy, not assignment
    secretive_plotter.setName("Secretive Plotter");
    secretive_plotter.boostStigmaPower(10);
    secretive_plotter.display_info();
    printDivider();
    dokja.boostStigmaPower(20);
    dokja.display_info();
    printDivider();
    yoo_jh.display_info();   // proves the clone's boost never touched yoo_jh's own copy

    // ---------------- Inventory aggregation proof ----------------
    printSectionHeader("INVENTORY - AGGREGATION TEST");
    yoo_jh.addItem(Item("Sponsor's Dagger", 12));
    yoo_jh.addItem(Item("Compass Shard", 3));
    yoo_jh.displayInventory();
    printDivider();
    secretive_plotter.addItem(Item("Reserve Elixir", 99));
    secretive_plotter.addItem(Item("Spare Cloak", 2));   // should fail — full
    secretive_plotter.displayInventory();
    printDivider();
    yoo_jh.displayInventory();   // proves the clone's item never touched the original

    // ---------------- Setter validation edge cases ----------------
    printSectionHeader("EDGE CASES - SETTER VALIDATION");
    Incarnation empty_name("", 50, 10, 5);   // empty name should be rejected
    empty_name.display_info();
    printDivider();
    Incarnation unknown;                     // default constructor
    unknown.display_info();
    printDivider();
    yoo_jh.setHealth(60);
    yoo_jh.setLevel(60);
    yoo_jh.display_info();
    printDivider();
    dokja.setHealth(88);
    dokja.setLevel(44);
    yoo_jh.setHealth(-2);   // rejected — out of range
    yoo_jh.setLevel(0);     // rejected — out of range
    yoo_jh.display_info();
    printDivider();
    Incarnation broken("Test", 500, -5, 9);  // both health and level rejected
    broken.display_info();

    printSectionHeader("SIMULATION END - REGRESSIONS FIRING IN REVERSE ORDER");
    return 0;   // destructors fire here, in reverse construction order
}
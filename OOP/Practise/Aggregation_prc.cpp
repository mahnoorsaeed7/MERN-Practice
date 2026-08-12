#include <iostream>
#include <string>
using namespace std; // Added as requested

// 1. Create the independent object (The Passenger)
class Passenger {
public:
    string name;
    Passenger(string n) {
        name = n;
    }
};

// 2. Create the container object (The Taxi)
class Taxi {
public:
    string taxiNumber;
    Passenger* currentPassenger; // Taxi "HAS A" Passenger pointer

    // We pass the passenger's memory address into the Taxi
    Taxi(string num, Passenger* p) {
        taxiNumber = num;
        currentPassenger = p;
    }
};

int main() {
    // Step 1: Create a passenger named Alex
    Passenger* alex = new Passenger("Alex");

    // Step 2: Create a taxi and put Alex inside it
    Taxi* yellowCab = new Taxi("TX-123", alex);

    cout << "Taxi " << yellowCab->taxiNumber << " is carrying " << yellowCab->currentPassenger->name << endl;

    // Step 3: Destroy the taxi!
    delete yellowCab; 
    cout << "--- Taxi has been destroyed! ---" << endl;

    // Step 4: Prove that Alex is still alive and safe in memory
    cout << "Passenger status: " << alex->name << " is still alive and safe!" << endl;

    // Clean up Alex from memory at the very end
    delete alex;
    return 0;
}

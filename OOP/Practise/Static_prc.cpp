#include<iostream>
#include<string>
using namespace std;

class Money {
    public:
      static int amount;
      int  getIncreasedAmount() {
          return amount;
      }
      void setIncreasedAmount(int m) {
          amount += m;
      }

      Money(int m) {
          amount += m ;
      }

      void displayAmount() {
          cout << "Total Money instances: " << amount << endl;
      }
};

int Money::amount = 0;

int main() {

    cout << "Starting Amount "<< Money::amount << endl;
    
    Money contellation(100);
    contellation.setIncreasedAmount(100);
    contellation.displayAmount();
    
    cout << "Starting Amount "<< Money::amount << endl;
    // INCREACING THE AMOUNT OF MONEY OF constellation
    contellation.setIncreasedAmount(500);
    contellation.displayAmount();
    
    cout << "Starting Amount "<< Money::amount << endl;
    return 0;
}
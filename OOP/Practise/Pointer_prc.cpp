#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int *p1 = &a; 
    
    // 1. Correct the type to int** (pointer-to-pointer)
    int **q1 = &p1; 
    
    // 2. Increment q1 itself, not p1
    int **q2 = q1 + 1; 

    // This will now print 1
    cout << "difference between q1 and q2: " << q2 - q1 << endl; 

    return 0;
}

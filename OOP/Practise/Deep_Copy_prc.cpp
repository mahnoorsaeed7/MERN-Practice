#include <iostream>
#include <string>
using namespace std;

class Modifiers
{
public:
    // string titles[10] = {"Demon King of Salvation" , "Watcher of Light and Darkness" ,"King of Kingless World"};
    string name;
    int *countptr;

    Modifiers(string name, int count)
    {
        this->name = name;
        this->countptr = new int;
        *countptr = count;

    }

    Modifiers(const Modifiers &Incarnation){
        this->name = Incarnation.name;
        this->countptr = new int;
        *countptr =  *Incarnation.countptr;
    }

    // destructor
    ~Modifiers()
    {
        cout << "Destructor called for " << name << endl;
        delete countptr;
    }


    void display_info()
    {
        cout << "Name: " << name << "\nCount: " << *countptr << endl;
    }

};



int main()
{
    Modifiers yoo_jh("yoo joonghyuk", 5);
    yoo_jh.display_info();
    Modifiers Kim_Sang_Young("Kim Sang Young", 4);
    Kim_Sang_Young.display_info();

    cout << "Changing yoo_jh's count..." << endl;
    *(yoo_jh.countptr) = 8;
    yoo_jh.display_info();
    return 0;
}
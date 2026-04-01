#include <bits/stdc++.h>
using namespace std;
#include "mfloat.cpp"

typedef _mfloat<10, 15, 20, -20> mfloat;



void testSum(){
    cout << "\n----- TESTE SUM ------\n" << endl;

    long double x = 1234.56789;
    long double y = 23.54321;

    mfloat mx(x);
    mfloat my(y);
    mfloat sum = mx + my;

    cout << x << endl;
    cout << mx.toDouble() << endl;
    
    cout << "+" << endl;

    cout << y << endl;
    cout << my.toDouble() << endl;

    cout << "=" << endl;

    cout << x+y << endl;
    cout << sum.toDouble() << endl;

    cout << "Diff: " << (x+y) - sum.toDouble() << endl;

    cout << endl;

    mx.printReal();
    my.printReal();
    sum.printReal();
}

int main(){
    cout << fixed << setprecision(30);

    testSum();
}

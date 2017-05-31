from django.shortcuts import render

def index(request):
    return render(request, 'labs/index.html', {
        'title': 'lab1: data binding',
        })

def lab1(request):
    return render(request, 'labs/lab1.html', {
        'title': 'lab1: data binding',
        })

    
def lab2(request):
    return render(request, 'labs/lab2.html', {
        'title': 'lab2: data binding',
        })

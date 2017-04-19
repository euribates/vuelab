from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'lab1/index.html', {
        'titulo': 'Lab1 / Componentes',
        })

def scope_view(request):
    return render(request, 'lab1/scope.html', {
        'titulo': 'Lab1 / Componentes / Scope',
        })

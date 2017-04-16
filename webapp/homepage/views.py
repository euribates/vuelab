#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render

# Create your views here.

def homepage(request):
    return render(request, 'homepage/index.html', {
        'titulo': 'Página de inicio',
        })


#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render

def index(request):
    return render(request, 'lab2/index.html', {
        'titulo': 'Lab2 / Configurando Vue.js',
        })

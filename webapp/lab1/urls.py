#!/usr/bin/env python
# -*- coding: utf-8

from django.conf.urls import url
from lab1 import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^scope/$', views.scope_view, name='scope'),
    ]

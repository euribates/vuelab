#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function
from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from django.conf.urls import url
from labs import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^lab1/$', views.lab1, name='lab1'),
    url(r'^lab2/$', views.lab2, name='lab2'),
    ]


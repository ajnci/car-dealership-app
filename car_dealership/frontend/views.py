from django.shortcuts import render

def dashboard_prelogin(request):
    return render(request, 'dashboard_prelogin.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def login(request):
    return render(request, 'index.html')

def signup(request):
    return render(request, 'signup.html')

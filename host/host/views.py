from django.http import HttpResponseRedirect, HttpResponse


def page_not_found_view(request, exception):
    print('here')
    return HttpResponseRedirect("/")

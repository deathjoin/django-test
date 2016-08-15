from django.contrib import admin
from django import forms
from .models import Ringset, Ringshedule, Settings, Ringtime
# Register your models here.


class RingtimeInline(admin.TabularInline):
    model = Ringtime
    extra = 0


class RingsetAdmin(admin.ModelAdmin):
    inlines = [RingtimeInline]

    class Media:
        js = ('timepicker.js', )


class SettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    fields = 'name', 'value', 'description'
    list_display = 'name', 'value'
    readonly_fields = 'key', 'name', 'description'


admin.site.register(Ringshedule)
admin.site.register(Ringset, RingsetAdmin)
admin.site.register(Settings, SettingsAdmin)

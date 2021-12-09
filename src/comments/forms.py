from django import forms


class CreateComment(forms.Form):
    text = forms.CharField(widget=forms.Textarea())

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from .models import Comment

from users.models import Profile
from blog.models import BlogPost


def retrieve_comments(request, post_id):
    blog_post = get_object_or_404(BlogPost, id=post_id)
    comment_set = blog_post.comment_set.all()

    comments = [x.serialize() for x in comment_set]
    data = {'comments': comments}

    return JsonResponse(data)


def create_comment(request, post_id):
    text = request.POST.get('text') or None
    post = get_object_or_404(BlogPost, id=post_id)
    profile = get_object_or_404(Profile, user=request.user)

    comment = Comment.objects.create(post=post, user=profile, text=text, created=timezone.now())

    return JsonResponse(comment.serialize(), status=201)


# add csrf verification
@csrf_exempt
def delete_comment(request, post_id, comment_id):
    qs = Comment.objects.filter(id=comment_id, user=get_object_or_404(Profile, user=request.user))

    if not qs.exists():
        return JsonResponse({'message': 'forbidden'}, status=401)

    qs.first().delete()

    return JsonResponse({'message': 'success'}, status=200)

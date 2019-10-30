from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('profile/<int:id>', views.profile, name='profile'),
    path('profile/<int:id>/workspace/', views.get_workspace_of_user, name='get_workspace_of_user'),
    path('workspace/', views.create_workspace, name='create_workspace'),
    path('workspace/<int:id>/', views.workspace, name='workspace'),
    path('workspace/<int:w_id>/user/<int:u_id>/todos/', views.specific_todo, name='specific_todo'),
    path('workspace/<int:w_id>/notes/', views.notes, name='notes'),
    path('workspace/<int:w_id>/note/<int:n_id>/', views.specific_note, name='specific_note'),

]
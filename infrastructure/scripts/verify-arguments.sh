#!/bin/sh

# Determines whether any of the given arguments are unset
# Parameters -
# #@ - an array of NAMES (not values) of variables to check
#
# For example:
# var1="hello"
# var2=""
# var3="world"
# ARG_ARRAY=(var1 var2 var3)
# verify_arguments_are_set "${ARG_ARRAY[@]}"
# > verify_arguments_are_set: variable var2 is not set
verify_arguments_are_set()
{
    # Validate that all required environment variables are set
    for var in "$@"; do
        if [ -z "${!var}" ]; then
            echo "verify_arguments_are_set variable $var is not set"
            exit 1
        fi
    done
}
# Script checking all solutions
PROBLEMS=( 1 2 3 4 5 )

for i in "${PROBLEMS[@]}"
do
  if [ -d "$i" ]
  then
    echo "Testing: $i"
    cd "$i/"
    GENERATED_ANSWER="$(node solution.js)"
    TRUE_ANSWER="$(cat answer.txt)"

    if [ "$GENERATED_ANSWER" == "$TRUE_ANSWER" ]; then
        echo "SUCCESS"
    else
        echo "FAIL"
    fi

    cd ..
  else
    echo "$i is not a directory!"
  fi

done

(define get-containers
  (lambda (amount containers)
    (if (= amount 0)
        '()
        (if (not (null? containers))
            (let ((first-container (car containers)))
              (let ((new-amount (- amount first-container)))
                (if (= new-amount 0)
                    (list first-container)
                    (map (lambda (n) (cons first-container n)) (get-containers new-amount (cdr containers))))))))))

(get-containers 5 (list 5 5))